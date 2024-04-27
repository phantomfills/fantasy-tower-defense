import { Signal } from "@rbxts/beacon";
import { EnemyAttack, TowerAttack } from "shared/modules/attack";

export const attackEnemy = new Signal<TowerAttack>();
export const attackTower = new Signal<EnemyAttack>();
