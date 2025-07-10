#!/usr/bin/env node

import { spawnSync } from "child_process";
import { Command, Option } from "commander";
import fs from "fs-extra";
import path from "path";

import { CreatePackageType } from "../../type/create-package";
import { dependencyConfigs } from "../config/dependency-configs";
import {
  BooleanOption,
  CommandOptionBucket,
  StringOption,
} from "../module/create-package/command-option";
import { askQuestion } from "../util/cli-utils";
import { createFolder, overwriteFile, resolvePath } from "../util/file-utils";
import { setDependenciesToPackageJson } from "../util/package-utils";

// TODO package manager 선택 가능하게.
// TODO react-vite 에서 스타일 반영 방식 고도화
// TODO license 고를수 있도록 (private or mit)
// TODO user name git config 기준
// TODO 에러나면 작업사항 롤백

const bucket = new CommandOptionBucket([
  // command options
  new StringOption({
    name: "type",
    option: new Option(
      `-t, --type <type>`,
      "패키지 타입을 선택하세요. lib, react-swc, react-vite 중 하나를 선택 할 수 있습니다. lib는 라이브러리, react-swc은 가벼운 웹 라이브러리, react-vite는 vite 기반 웹 라이브러리 입니다. 해당 값에 따라 프로젝트 템플릿이 적절하게 세팅 됩니다."
    ),
    isRequired: true,
  }),
  new StringOption({
    name: "dest-dir",
    option: new Option(
      `-d, --dest-dir <dest-dir>`,
      "패키지 생성을 위한 루트(워크스페이스) 경로를 입력하세요. 기본값은 현재 경로입니다."
    ),
  }),
  new StringOption({
    name: "post-action",
    option: new Option(
      `--pa, --post-action <post-action>`,
      "생성 스크립트가 종료되고 실행할 action 입니다. 해당 action 은 호출 위치에서 실행 됩니다."
    ),
  }),
  new StringOption({
    name: "post-target-action",
    option: new Option(
      `--pta, --post-target-action <post-target-action>`,
      "생성 스크립트가 종료되고 실행할 action 입니다. 해당 action 은 outputDir 안에서 실행 됩니다."
    ),
  }),
  // meta options
  new StringOption({
    name: "project-name",
    option: new Option(
      `--pn, --project-name <project-name>`,
      "프로젝트 이름을 입력하세요. 해당 명칭은 폴더명으로도 사용 됩니다. 프로젝트 명은 kebab case(https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case) 를 추천합니다."
    ),
    isRequired: true,
  }),
  new StringOption({
    name: "project-description",
    option: new Option(
      `--pd, --project-description <project-description>`,
      "프로젝트 설명을 입력하세요."
    ),
    isRequired: true,
  }),
  new StringOption({
    name: "project-git-url",
    option: new Option(
      `--pgu, --project-git-url <project-git-url>`,
      "프로젝트 Git 주소를 입력하세요"
    ),
    defaultValue: "https://github.com/Team-EdgeEffect/library-js",
  }),
  new StringOption({
    name: "package-name",
    option: new Option(
      `--pkg-n, --package-name <package-name>`,
      "패키지(모듈)명을 입력하세요. 입력하지 않으면 기본값은 {project-name} 또는 @{project-organization}/{project-name} 입니다."
    ),
  }),
  new StringOption({
    name: "project-organization",
    option: new Option(
      `--po, --project-organization <project-organization>`,
      "프로젝트 조직 이름을 입력하세요."
    ),
  }),
  new StringOption({
    name: "author-name",
    option: new Option(
      `--an, --author-name <author-name>`,
      "프로젝트 author 이름을 입력하세요. project-organization 가 입력 된 경우 @{project-organization}#{author-name} 형태로 입력 됩니다."
    ),
    defaultValue: "dark1451",
  }),
  new StringOption({
    name: "author-email",
    option: new Option(
      `--ae, --author-email <author-email>`,
      "프로젝트 author 이메일을 입력하세요."
    ),
    defaultValue: "dark1451@gmail.com",
  }),
  new StringOption({
    name: "author-url",
    option: new Option(
      `--au, --author-url <author-url>`,
      "프로젝트 author 컨택 주소를 입력하세요."
    ),
    defaultValue: "https://github.com/dark1451",
  }),
  // config file options
  new StringOption({
    name: "tsconfig",
    option: new Option(
      `--ts, --tsconfig <tsconfig>`,
      "사용하고자 하는 tsconfig.json 파일의 경로 입니다."
    ),
  }),
  new StringOption({
    name: "tsconfig-type",
    option: new Option(
      `--ts-type, --tsconfig-type <tsconfig-type>`,
      "type 을 빌드 할 때, 사용하고자 하는 tsconfig.json 파일의 경로 입니다."
    ),
  }),
  new StringOption({
    name: "swc-cjs",
    option: new Option(
      `--swc-cjs <swc-cjs>`,
      "swc 에서 cjs 를 빌드 할 때 사용하고자 하는 파일의 경로 입니다."
    ),
  }),
  new StringOption({
    name: "swc-esm",
    option: new Option(
      `--swc-esm <swc-esm>`,
      "swc 에서 esm 를 빌드 할 때 사용하고자 하는 파일의 경로 입니다."
    ),
  }),
  new StringOption({
    name: "eslint-config",
    option: new Option(
      `--eslint-config <eslint-config>`,
      "eslint 세팅 파일의 경로 입니다."
    ),
  }),
  // etc options
  new BooleanOption({
    name: "can-publish",
    option: new Option(
      `--cp, --can-publish`,
      "프로젝트가 배포 가능한 패키지인지 확인합니다. 배포에 적절한 프로퍼티를 가진 package.json 을 생성합니다."
    ),
    defaultValue: false,
  }),
  new BooleanOption({
    name: "without-install",
    option: new Option(
      `--wi, --without-install`,
      "필요한 기본 종속성을 install 하지 않도록 합니다."
    ),
    defaultValue: false,
  }),
  //
  new BooleanOption({
    name: "yes",
    option: new Option(`-y, --yes`, "모든 대화형 입력에 기본값을 사용 합니다."),
    defaultValue: false,
  }),
]);

const command = new Command("create-package");
command
  .storeOptionsAsProperties(false)
  .description("Javascript 기반 패키지를 생성합니다.")
  .action(async (option) => {
    const skipInteraction = !!option.yes;
    const parsedOptions = bucket.fromObject(option, skipInteraction);

    if (!skipInteraction) {
      for (const parsedOption of parsedOptions) {
        const {
          isRequired,
          defaultValue,
          name,
          option: { description },
        } = parsedOption.meta;

        // yes 플래그는 무시합니다.
        if (name === "yes") continue;

        if (!isRequired && parsedOption.value === undefined) {
          const measuredDefaultValue = defaultValue?.toString();
          const answer = await askQuestion({
            query: name,
            description: measuredDefaultValue
              ? `${description} (기본값: ${measuredDefaultValue})`
              : description,
            defaultValue: measuredDefaultValue,
          });
          parsedOption.value = answer;
        }
      }
    }

    // validations
    for (const parsedOption of parsedOptions) {
      if (
        parsedOption instanceof StringOption &&
        parsedOption.meta.name === "type" &&
        parsedOption.value
      ) {
        if (!["lib", "react-swc", "react-vite"].includes(parsedOption.value)) {
          console.error(
            "패키지 타입은 lib, react-swc, react-vite 중 하나여야 합니다. 자세한 내용은 help 옵션을 참고 해주세요."
          );
          return;
        }
      }
    }

    // 옵션에서 변수를 초기화 합니다.
    const projectName = bucket.getOptionValueString("project-name");
    const packageName = bucket.tryOptionValueString("package-name") ?? "";
    const projectOrganization =
      bucket.tryOptionValueString("project-organization") ?? "";
    const authorName = bucket.getOptionValueString("author-name");
    // template 용 변수를 선언 합니다. 해당 값은 템플릿 리터럴 될 수 있습니다.
    const configVariables = {
      "project-name": projectName,
      "package-name":
        packageName ||
        (projectOrganization
          ? `@${projectOrganization}/${projectName}`
          : projectName),
      "project-description": bucket.getOptionValueString("project-description"),
      "project-git-url": bucket.getOptionValueString("project-git-url"),
      "author-name": projectOrganization
        ? `@${projectOrganization}#${authorName}`
        : authorName,
      "author-email": bucket.getOptionValueString("author-email"),
      "author-url": bucket.getOptionValueString("author-url"),
    };
    // 기타 전체 옵션에 접근 하는 변수를 선언 합니다.
    const optionVariables = {
      type: bucket.getOptionValueString("type") as CreatePackageType,
      tsconfig: bucket.tryOptionValueString("tsconfig"),
      "tsconfig-type": bucket.tryOptionValueString("tsconfig-type"),
      "swc-cjs": bucket.tryOptionValueString("swc-cjs"),
      "swc-esm": bucket.tryOptionValueString("swc-esm"),
      "eslint-config": bucket.tryOptionValueString("eslint-config"),
      "dest-dir": bucket.tryOptionValueString("dest-dir"),
      "post-action": bucket.tryOptionValueString("post-action"),
      "post-target-action": bucket.tryOptionValueString("post-target-action"),
      "can-publish": bucket.tryOptionValueBoolean("can-publish") ?? false,
      "without-install":
        bucket.tryOptionValueBoolean("without-install") ?? true,
      ...configVariables,
    };
    const destDir = optionVariables["dest-dir"];

    // 각종 변수를 초기화 합니다.
    const executeDir = process.env.INIT_CWD || process.cwd();
    const srcDir = path.join(__dirname, "../..");
    const packageTemplateDir = path.join(
      srcDir,
      "../project-resource/package-template"
    );
    const targetTemplateDir = path.join(
      packageTemplateDir,
      optionVariables.type
    );
    const outputDir = path.join(
      destDir ? path.join(executeDir, destDir) : executeDir,
      optionVariables["project-name"]
    );

    // outputDir 이 이미 존재하는지 확인 합니다.
    if (fs.existsSync(outputDir)) {
      let requestRemove: boolean = false;

      if (!skipInteraction) {
        requestRemove =
          (await askQuestion({
            query: "outputDir",
            description: `해당 경로에 이미 폴더가 존재합니다. 덮어쓰시겠습니까? (y/n)`,
            oneOf: ["y", "n"],
            isRequire: true,
          })) === "y";
      } else {
        requestRemove = false;
      }
      if (requestRemove) fs.removeSync(outputDir);
    }

    // TODO step by types
    // 템플릿 복사 작업을 시작합니다.
    // template 을 복사 합니다.
    fs.copySync(targetTemplateDir, outputDir);
    if (fs.existsSync(path.join(outputDir, "gitignore"))) {
      fs.renameSync(
        path.join(outputDir, "gitignore"),
        path.join(outputDir, ".gitignore")
      );
    }
    // package json update
    // package json update - 사용되지 않는 package json 파일은 삭제합니다.
    fs.rmSync(
      path.join(
        outputDir,
        !optionVariables["can-publish"]
          ? "package.publish.json"
          : "package.default.json"
      )
    );
    // package json update - 템플릿에 의해 복사된 package json 파일명을 제대로 수정합니다.
    fs.renameSync(
      path.join(
        outputDir,
        optionVariables["can-publish"]
          ? "package.publish.json"
          : "package.default.json"
      ),
      path.join(outputDir, "package.json")
    );

    // 인풋에 의한 템플릿 덮어쓰기 작업
    // 인풋에 의한 템플릿 덮어쓰기 작업 - tsconfig
    if (optionVariables.tsconfig) {
      const tsconfigPath = resolvePath(optionVariables.tsconfig, executeDir);
      fs.copyFileSync(tsconfigPath, path.join(outputDir, "tsconfig.json"));
    }
    // 인풋에 의한 템플릿 덮어쓰기 작업 - tsconfig-type
    if (optionVariables["tsconfig-type"]) {
      const tsconfigTypePath = resolvePath(
        optionVariables["tsconfig-type"],
        executeDir
      );
      fs.copyFileSync(
        tsconfigTypePath,
        path.join(outputDir, "tsconfig.type.json")
      );
    }
    // 인풋에 의한 템플릿 덮어쓰기 작업 - swc-cjs
    if (optionVariables["swc-cjs"]) {
      const swcCjsPath = resolvePath(optionVariables["swc-cjs"], executeDir);
      fs.copyFileSync(swcCjsPath, path.join(outputDir, "swc-cjs.json"));
    }
    // 인풋에 의한 템플릿 덮어쓰기 작업 - swc-esm
    if (optionVariables["swc-esm"]) {
      const swcEsmPath = resolvePath(optionVariables["swc-esm"], executeDir);
      fs.copyFileSync(swcEsmPath, path.join(outputDir, "swc-esm.json"));
    }
    // 인풋에 의한 템플릿 덮어쓰기 작업 - eslint-config
    if (optionVariables["eslint-config"]) {
      // 템플릿에 의해 복사된 기존 eslint 파일들 제거, 추후 파일명 통합 고려
      ["eslint.config.mjs", "eslint.config.js"].forEach((file) => {
        const filePath = path.join(outputDir, file);
        if (fs.existsSync(filePath)) {
          fs.removeSync(filePath);
        }
      });

      // 사용자 지정 eslint 파일 복사
      const eslintConfigPath = resolvePath(
        optionVariables["eslint-config"],
        executeDir
      );
      const eslintConfigFileName = path.basename(eslintConfigPath);
      fs.copyFileSync(
        eslintConfigPath,
        path.join(outputDir, eslintConfigFileName)
      );
    }

    // 복사한 템플릿을 인자값에 의해 업데이트 합니다.
    overwriteFile(`${outputDir}/package.json`, configVariables);
    overwriteFile(`${outputDir}/LICENSE`, configVariables);
    overwriteFile(`${outputDir}/README.md`, configVariables);

    // 필요한 폴더들을 미리 생성합니다.
    createFolder(path.join(outputDir, "src/script"));
    createFolder(path.join(outputDir, "src/resource"));
    createFolder(path.join(outputDir, "src/component"));

    // 패키지 인스톨 작업
    const packageJsonPath = path.join(outputDir, "package.json");
    const targetDependencies = dependencyConfigs[optionVariables.type];
    // 패키지 인스톨 작업 - eslint-config가 전달되지 않은 경우 기본 eslint 설정 추가
    if (!optionVariables["eslint-config"]) {
      targetDependencies.push({
        name: "@locked-dobby/eslint-config",
        version: "~2.1.0",
        targets: ["--save-dev"],
      });
    }
    // 패키지 인스톨 작업 - 의존성을 package.json에 추가
    setDependenciesToPackageJson(packageJsonPath, targetDependencies);

    // 패키지 인스톨 작업 - without-install 플래그 확인하여 설치 실행
    if (!optionVariables["without-install"]) {
      spawnSync("pnpm", ["install"], { stdio: "inherit", cwd: outputDir });
    }

    try {
      if (optionVariables["post-target-action"]) {
        console.info("🎬 Post-target-action 실행 중...");
        const parts = optionVariables["post-target-action"].split(" ");
        spawnSync(parts[0], parts.slice(1), {
          stdio: "inherit",
          cwd: outputDir,
        });
      }
      if (optionVariables["post-action"]) {
        console.info("🎬 Post-action 실행 중...");
        const parts = optionVariables["post-action"].split(" ");
        spawnSync(parts[0], parts.slice(1), {
          stdio: "inherit",
          cwd: executeDir,
        });
      }
    } catch (e) {
      console.error(e);
    }

    console.info(`✅ ${outputDir} 에 생성 되었습니다.`);
  });

for (const option of bucket.options) {
  const {
    option: { flags, description },
    isRequired,
  } = option.meta;
  if (isRequired) command.requiredOption(flags, description);
  else command.option(flags, description);
}
export const createPackageCommand = command;
