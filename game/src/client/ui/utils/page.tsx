import React from "@rbxts/react";
import { E_Pages, selectCurrentPage } from "client/store/page";
import { useSelector } from "@rbxts/react-reflex";
import { Group } from "./group";

interface PageProps extends React.PropsWithChildren {
	page: E_Pages;
}

export function Page({ page, children }: PageProps) {
	const currentPage = useSelector(selectCurrentPage);

	return <Group size={new UDim2(1, 0, 1, 0)}>{page === currentPage && children}</Group>;
}
