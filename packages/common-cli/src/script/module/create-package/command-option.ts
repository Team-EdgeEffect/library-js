import { Option } from "commander";

export class CommandOptionBucket {
  constructor(public options: ReadonlyArray<CommandOption>) {}

  /**
   * object 에서 값을 가져와서 CommandOption 으로 변환합니다.
   */
  public fromObject(
    object: Record<string, unknown>,
    applyDefaultValue: boolean = false
  ): Array<CommandOption> {
    return this.options.map((option) => {
      const value = object[option.meta.option.attributeName()];
      if (value) {
        option.value = value;
      } else {
        if (applyDefaultValue) option.value = option.meta.defaultValue;
      }
      return option;
    });
  }

  public fromObjectToRecord(
    object: Record<string, unknown>,
    applyDefaultValue: boolean = false
  ): Record<string, CommandOption> {
    const result: Record<string, CommandOption> = {};

    this.fromObject(object, applyDefaultValue).forEach((option) => {
      result[option.meta.name] = option;
    });

    return result;
  }

  public findOption(name: string): CommandOption {
    const found = this.options.find((option) => option.meta.name === name);
    if (!found) {
      throw new Error(`CommandOption not found: ${name}`);
    } else {
      return found;
    }
  }

  public getOptionValueString(name: string): string {
    const found = this.findOption(name);
    return found.value!.toString();
  }

  public tryOptionValueString(name: string): string | undefined {
    const found = this.findOption(name);
    return found.value?.toString();
  }

  public getOptionValueBoolean(name: string): boolean {
    const found = this.findOption(name);
    return !!found.value;
  }

  public tryOptionValueBoolean(name: string): boolean | undefined {
    const found = this.findOption(name);
    if (found) return !!found.value;
    else return undefined;
  }
}

export class CommandOption<ValueType = unknown> {
  public value: ValueType | undefined;

  constructor(
    public meta: {
      name: string;
      option: Option;
      isRequired?: boolean;
      defaultValue?: ValueType;
    }
  ) {}
}

export class BooleanOption extends CommandOption<boolean> {}

export class StringOption extends CommandOption<string> {}
