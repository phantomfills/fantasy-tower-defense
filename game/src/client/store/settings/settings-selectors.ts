import { RootState } from "..";

export const selectEnemyDetailViewType = (state: RootState) => state.settings.enemyDetailViewType;
export const selectDialogVisibilityType = (state: RootState) => state.settings.dialogVisibilityType;
