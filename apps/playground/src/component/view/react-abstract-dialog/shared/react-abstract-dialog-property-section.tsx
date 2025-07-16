import {
  AlertProps,
  ConfirmProps,
  ToastProps,
} from "@edge-effect/react-abstract-dialog";

import { UseReactAbstractDialogPropertyActions } from "@/component/hook/use-react-abstract-dialog-property";

export const ReactDialogPropertySection = <
  ConfirmPropType extends ConfirmProps,
  AlertPropType extends AlertProps,
  ToastPropType extends ToastProps,
>({
  properties,
  setPropertyInfo,
}: Pick<
  UseReactAbstractDialogPropertyActions<
    ConfirmPropType,
    AlertPropType,
    ToastPropType
  >,
  "propertyInfo" | "setPropertyInfo" | "properties"
>) => {
  return (
    <section>
      <h2>Properties</h2>
      <ul>
        {properties.map((property) => {
          const unique = `react-abstract-dialog-context-${property.name}`;
          if (property.type === "string")
            return (
              <li key={unique}>
                <h3>{property.displayName}</h3>
                <input
                  id={unique}
                  type="text"
                  value={property.value}
                  onChange={(e) =>
                    setPropertyInfo((prevPropertyInfo) => ({
                      ...prevPropertyInfo,
                      [property.name]: { ...property, value: e.target.value },
                    }))
                  }
                />
                <label htmlFor={unique}>{property.description}</label>
              </li>
            );
          else if (property.type === "boolean")
            return (
              <li key={unique}>
                <h3>{property.displayName}</h3>
                <input
                  checked={Boolean(property.value)}
                  id={unique}
                  type="checkbox"
                  onChange={(e) =>
                    setPropertyInfo((prevPropertyInfo) => ({
                      ...prevPropertyInfo,
                      [property.name]: { ...property, value: e.target.checked },
                    }))
                  }
                />
                <label htmlFor={unique}>{property.description}</label>
              </li>
            );
          else return <li key={unique}>해당 옵션을 렌더링 할 수 없습니다.</li>;
        })}
      </ul>
    </section>
  );
};
