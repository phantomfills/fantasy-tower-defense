import React from "@rbxts/react";
import { E_Pages, selectCurrentPage } from "client/store/page";
import { Frame } from "./frame";
import { useSelector } from "@rbxts/react-reflex";

interface PageProps extends React.PropsWithChildren {
	page: E_Pages;
}

export function Page({ page, children }: PageProps) {
	const currentPage = useSelector(selectCurrentPage);

	return <Frame size={new UDim2(1, 0, 1, 0)}>{page === currentPage && children}</Frame>;
}
