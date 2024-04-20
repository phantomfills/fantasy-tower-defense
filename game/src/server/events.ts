import { Signal } from "@rbxts/beacon";
import { EnemyAttack, TowerAttack } from "shared/modules/attack";

export const towerAttack = new Signal<TowerAttack>();
export const enemyAttack = new Signal<EnemyAttack>();
