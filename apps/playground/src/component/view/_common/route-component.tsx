import { ComponentType, Suspense } from "react";

interface RouteComponentProps {
  Container: ComponentType;
}
export const RouteComponent = ({ Container }: RouteComponentProps) => {
  return (
    <Suspense>
      <Container />
    </Suspense>
  );
};
