import { ReflexProvider } from "@rbxts/react-reflex";
import Roact from "@rbxts/roact";
import { rootProducer } from "../producers/root-provider";

export function RootProvider(props: Roact.PropsWithChildren) {
	return <ReflexProvider producer={rootProducer}>{props.children}</ReflexProvider>;
}
