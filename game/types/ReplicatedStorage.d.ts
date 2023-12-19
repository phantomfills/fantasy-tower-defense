interface ReplicatedStorage extends Instance {
	TS: Folder & {
		modules: Folder & {
			map: Folder & {
				["path-waypoint"]: ModuleScript;
			};
			tower: Folder & {
				["tower-type-to-display-name-map"]: ModuleScript;
				["tower-type-to-model-map"]: ModuleScript;
				["tower-type"]: ModuleScript;
				["tower-model"]: ModuleScript;
			};
			util: Folder & {
				["get-time-in-ms"]: ModuleScript;
				prettify: ModuleScript;
				possible: ModuleScript;
				["get-path-length"]: ModuleScript;
				["number-to-key-map"]: ModuleScript;
				["snap-to-cframe"]: ModuleScript;
			};
			enemy: Folder & {
				["enemy-type-to-enemy-stats"]: ModuleScript;
				["enemy-type"]: ModuleScript;
			};
		};
		assets: ModuleScript;
		network: ModuleScript;
		components: Folder;
		store: ModuleScript & {
			map: ModuleScript & {
				["map-selectors"]: ModuleScript;
				["map-slice"]: ModuleScript;
			};
			tower: ModuleScript & {
				["tower-slice"]: ModuleScript;
				["tower-selectors"]: ModuleScript;
			};
			enemy: ModuleScript & {
				["enemy-slice"]: ModuleScript;
				["enemy-selectors"]: ModuleScript;
			};
		};
	};
	assets: Folder & {
		towers: Folder & {
			archer: Folder & {
				models: Folder & {
					archer: Model & {
						["Left Leg"]: MeshPart;
						["Right Leg"]: MeshPart;
						Head: MeshPart & {
							face: Decal;
						};
						Torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						["Right Arm"]: MeshPart & {
							["Right Arm 🡪 Arrow"]: Weld;
							["Right Arm 🡪 Bow"]: Weld;
						};
						["Left Arm"]: MeshPart;
						Bow: Part & {
							Top: Attachment;
							TopBeam: Beam;
							Weld: Weld;
							Bottom: Attachment;
							BottomBeam: Beam;
							Middle: Attachment;
							Mesh: SpecialMesh;
						};
						Arrow: Part & {
							Mesh: SpecialMesh;
						};
					};
				};
				images: Folder & {
					placement: NumberValue;
				};
			};
		};
		enemies: Folder & {
			dummy: Folder & {
				models: Folder & {
					dummy: Model & {
						["left-arm"]: MeshPart;
						["left-leg"]: MeshPart;
						head: MeshPart & {
							["sad-face"]: Decal;
						};
						torso: MeshPart & {
							["Left Shoulder"]: Motor6D;
							["Right Shoulder"]: Motor6D;
							Neck: Motor6D;
							["Right Hip"]: Motor6D;
							["Left Hip"]: Motor6D;
						};
						["right-leg"]: MeshPart;
						humanoidRootPart: Part & {
							rootAttachment: Attachment;
							RootJoint: Motor6D;
						};
						["right-arm"]: MeshPart;
					};
				};
			};
		};
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@flamework"]: Folder & {
				core: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						reflect: ModuleScript;
						metadata: ModuleScript;
						modding: ModuleScript;
						flamework: ModuleScript;
					};
				};
				components: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						componentTracker: ModuleScript;
					};
				};
				networking: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						events: Folder & {
							createClientHandler: ModuleScript;
							createServerHandler: ModuleScript;
							createNetworkingEvent: ModuleScript;
						};
						functions: Folder & {
							createClientHandler: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createServerHandler: ModuleScript;
							errors: ModuleScript;
						};
						handlers: ModuleScript;
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							skip: ModuleScript;
						};
						util: Folder & {
							populateInstanceMap: ModuleScript;
						};
					};
				};
			};
			["@rbxts"]: Folder & {
				remo: Folder & {
					src: ModuleScript & {
						getSender: ModuleScript;
						Promise: ModuleScript;
						builder: ModuleScript;
						constants: ModuleScript;
						utils: Folder & {
							compose: ModuleScript;
							testRemote: ModuleScript;
							mockRemotes: ModuleScript;
							unwrap: ModuleScript;
							instances: ModuleScript;
						};
						types: ModuleScript;
						server: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						container: Configuration;
						client: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						middleware: Folder & {
							loggerMiddleware: ModuleScript;
							throttleMiddleware: ModuleScript;
						};
						createRemotes: ModuleScript;
					};
				};
				["roact-hooked"]: Folder & {
					src: ModuleScript & {
						hoc: ModuleScript;
						Roact: ModuleScript;
						NoYield: ModuleScript;
						withHookDetection: ModuleScript;
						pureComponent: ModuleScript;
						hooks: ModuleScript;
					};
				};
				services: ModuleScript;
				["roact-hooks"]: Folder & {
					src: ModuleScript & {
						createUseState: ModuleScript;
						createUseEffect: ModuleScript;
						createUseMemo: ModuleScript;
						dependenciesDifferent: ModuleScript;
						createUseValue: ModuleScript;
						createUseReducer: ModuleScript;
						createUseCallback: ModuleScript;
						createUseContext: ModuleScript;
						createUseBinding: ModuleScript;
					};
				};
				reflex: Folder & {
					src: ModuleScript & {
						createProducer: ModuleScript;
						broadcast: ModuleScript & {
							createBroadcastReceiver: ModuleScript;
							createBroadcaster: ModuleScript;
							hydrate: ModuleScript;
						};
						Promise: ModuleScript;
						createSelector: ModuleScript;
						utils: Folder & {
							shallowEqual: ModuleScript;
							testSelector: ModuleScript;
							createSelectArrayDiffs: ModuleScript;
							setInterval: ModuleScript;
						};
						combineProducers: ModuleScript;
						middleware: Folder & {
							loggerMiddleware: ModuleScript;
						};
						applyMiddleware: ModuleScript;
						types: ModuleScript;
					};
				};
				Scheduler: ModuleScript & {
					SchedulerPriorities: ModuleScript;
					TracingSubscriptions: ModuleScript;
					SchedulerMinHeap: ModuleScript;
					Scheduler: ModuleScript;
					Tracing: ModuleScript;
					forks: Folder & {
						["SchedulerHostConfig.mock"]: ModuleScript;
						["SchedulerHostConfig.default"]: ModuleScript;
					};
					unstable_mock: ModuleScript;
					SchedulerProfiling: ModuleScript;
					SchedulerHostConfig: ModuleScript;
					SchedulerFeatureFlags: ModuleScript;
				};
				LuauPolyfill: ModuleScript & {
					Number: ModuleScript & {
						MAX_SAFE_INTEGER: ModuleScript;
						isSafeInteger: ModuleScript;
						toExponential: ModuleScript;
						isNaN: ModuleScript;
						isInteger: ModuleScript;
						isFinite: ModuleScript;
						MIN_SAFE_INTEGER: ModuleScript;
					};
					Collections: ModuleScript & {
						Map: ModuleScript & {
							Map: ModuleScript;
							coerceToTable: ModuleScript;
							coerceToMap: ModuleScript;
						};
						Object: ModuleScript & {
							values: ModuleScript;
							assign: ModuleScript;
							is: ModuleScript;
							seal: ModuleScript;
							entries: ModuleScript;
							preventExtensions: ModuleScript;
							isFrozen: ModuleScript;
							keys: ModuleScript;
							freeze: ModuleScript;
							None: ModuleScript;
						};
						Set: ModuleScript;
						Array: ModuleScript & {
							flat: ModuleScript;
							indexOf: ModuleScript;
							every: ModuleScript;
							slice: ModuleScript;
							sort: ModuleScript;
							shift: ModuleScript;
							map: ModuleScript;
							isArray: ModuleScript;
							findIndex: ModuleScript;
							unshift: ModuleScript;
							splice: ModuleScript;
							filter: ModuleScript;
							find: ModuleScript;
							forEach: ModuleScript;
							reverse: ModuleScript;
							includes: ModuleScript;
							concat: ModuleScript;
							from: ModuleScript & {
								fromString: ModuleScript;
								fromArray: ModuleScript;
								fromSet: ModuleScript;
								fromMap: ModuleScript;
							};
							join: ModuleScript;
							flatMap: ModuleScript;
							reduce: ModuleScript;
							some: ModuleScript;
						};
						inspect: ModuleScript;
						WeakMap: ModuleScript;
					};
					InstanceOf: ModuleScript & {
						["instanceof"]: ModuleScript;
					};
					Symbol: ModuleScript & {
						Symbol: ModuleScript;
						["Registry.global"]: ModuleScript;
						GlobalRegistry: ModuleScript;
					};
					Timers: ModuleScript & {
						makeIntervalImpl: ModuleScript;
						makeTimerImpl: ModuleScript;
					};
					String: ModuleScript & {
						endsWith: ModuleScript;
						indexOf: ModuleScript;
						lastIndexOf: ModuleScript;
						trimStart: ModuleScript;
						trim: ModuleScript;
						findOr: ModuleScript;
						substr: ModuleScript;
						slice: ModuleScript;
						startsWith: ModuleScript;
						charCodeAt: ModuleScript;
						trimEnd: ModuleScript;
						includes: ModuleScript;
						split: ModuleScript;
					};
					LuauPolyfill: ModuleScript & {
						Promise: ModuleScript;
						["extends"]: ModuleScript;
						AssertionError: ModuleScript & {
							["AssertionError.global"]: ModuleScript;
						};
						Error: ModuleScript & {
							["Error.global"]: ModuleScript;
						};
						encodeURIComponent: ModuleScript;
					};
					Math: ModuleScript;
					Console: ModuleScript & {
						makeConsoleImpl: ModuleScript;
					};
					Boolean: ModuleScript & {
						toJSBoolean: ModuleScript;
					};
					ES7Types: ModuleScript;
				};
				["react-reflex"]: ModuleScript & {
					components: Folder & {
						ReflexContext: ModuleScript;
						ReflexProvider: ModuleScript;
					};
					hooks: Folder & {
						["use-producer"]: ModuleScript;
						["use-selector-creator"]: ModuleScript;
						["use-selector"]: ModuleScript;
					};
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				signal: ModuleScript;
				["pretty-react-hooks"]: ModuleScript & {
					["use-latest"]: ModuleScript & {
						["use-latest"]: ModuleScript;
						["use-latest.spec"]: ModuleScript;
					};
					utils: Folder & {
						binding: ModuleScript;
						hoarcekat: ModuleScript;
						["shallow-equal"]: ModuleScript;
						math: ModuleScript;
						motor: ModuleScript;
						testez: ModuleScript;
					};
					["use-binding-state"]: ModuleScript & {
						["use-binding-state.spec"]: ModuleScript;
						["use-binding-state"]: ModuleScript;
					};
					["use-unmount-effect"]: ModuleScript & {
						["use-unmount-effect.spec"]: ModuleScript;
						["use-unmount-effect"]: ModuleScript;
					};
					["use-update-effect"]: ModuleScript & {
						["use-update-effect.spec"]: ModuleScript;
						["use-update-effect"]: ModuleScript;
					};
					["use-previous"]: ModuleScript & {
						["use-previous"]: ModuleScript;
						["use-previous.spec"]: ModuleScript;
					};
					["use-interval"]: ModuleScript & {
						["use-interval.spec"]: ModuleScript;
						["use-interval"]: ModuleScript;
					};
					["use-debounce-callback"]: ModuleScript & {
						["use-debounce-callback"]: ModuleScript;
						["use-debounce-callback.spec"]: ModuleScript;
					};
					["use-property-binding"]: ModuleScript & {
						["use-property-binding"]: ModuleScript;
						["use-property-binding.spec"]: ModuleScript;
					};
					["use-defer-state"]: ModuleScript & {
						["use-defer-state"]: ModuleScript;
						["use-defer-state.spec"]: ModuleScript;
					};
					["use-key-press"]: ModuleScript & {
						["use-key-press"]: ModuleScript;
						["use-key-press.spec"]: ModuleScript;
					};
					["use-timeout"]: ModuleScript & {
						["use-timeout"]: ModuleScript;
						["use-timeout.spec"]: ModuleScript;
					};
					["use-composed-ref"]: ModuleScript & {
						["use-composed-ref.spec"]: ModuleScript;
						["use-composed-ref"]: ModuleScript;
					};
					["use-async-callback"]: ModuleScript & {
						["use-async-callback"]: ModuleScript;
						["use-async-callback.spec"]: ModuleScript;
					};
					["use-throttle-state"]: ModuleScript & {
						["use-throttle-state.spec"]: ModuleScript;
						["use-throttle-state"]: ModuleScript;
					};
					["use-defer-callback"]: ModuleScript & {
						["use-defer-callback.spec"]: ModuleScript;
						["use-defer-callback"]: ModuleScript;
					};
					["use-latest-callback"]: ModuleScript & {
						["use-latest-callback.spec"]: ModuleScript;
						["use-latest-callback"]: ModuleScript;
					};
					["use-motor"]: ModuleScript & {
						["use-motor"]: ModuleScript;
						["use-motor.spec"]: ModuleScript;
					};
					["use-throttle-callback"]: ModuleScript & {
						["use-throttle-callback.spec"]: ModuleScript;
						["use-throttle-callback"]: ModuleScript;
					};
					["use-property"]: ModuleScript & {
						["use-property"]: ModuleScript;
						["use-property.spec"]: ModuleScript;
						types: ModuleScript;
					};
					["use-update"]: ModuleScript & {
						["use-update.spec"]: ModuleScript;
						["use-update"]: ModuleScript;
					};
					["use-async-effect"]: ModuleScript & {
						["use-async-effect"]: ModuleScript;
						["use-async-effect.spec"]: ModuleScript;
					};
					["use-viewport"]: ModuleScript & {
						["use-viewport"]: ModuleScript;
						["use-viewport.spec"]: ModuleScript;
					};
					["use-binding-listener"]: ModuleScript & {
						["use-binding-listener"]: ModuleScript;
						["use-binding-listener.spec"]: ModuleScript;
					};
					["use-async"]: ModuleScript & {
						["use-async.spec"]: ModuleScript;
						["use-async"]: ModuleScript;
					};
					["use-debounce-effect"]: ModuleScript & {
						["use-debounce-effect"]: ModuleScript;
						["use-debounce-effect.spec"]: ModuleScript;
					};
					["use-throttle-effect"]: ModuleScript & {
						["use-throttle-effect.spec"]: ModuleScript;
						["use-throttle-effect"]: ModuleScript;
					};
					["use-timer"]: ModuleScript & {
						["use-timer"]: ModuleScript;
						["use-timer.spec"]: ModuleScript;
					};
					["use-defer-effect"]: ModuleScript & {
						["use-defer-effect.spec"]: ModuleScript;
						["use-defer-effect"]: ModuleScript;
					};
					["use-debounce-state"]: ModuleScript & {
						["use-debounce-state"]: ModuleScript;
						["use-debounce-state.spec"]: ModuleScript;
					};
					["use-event-listener"]: ModuleScript & {
						["use-event-listener"]: ModuleScript;
						["use-event-listener.spec"]: ModuleScript;
					};
					["use-lifetime"]: ModuleScript & {
						["use-lifetime"]: ModuleScript;
						["use-lifetime.spec"]: ModuleScript;
					};
					["use-camera"]: ModuleScript & {
						["use-camera.spec"]: ModuleScript;
						["use-camera"]: ModuleScript;
					};
					["use-mount-effect"]: ModuleScript & {
						["use-mount-effect"]: ModuleScript;
						["use-mount-effect.spec"]: ModuleScript;
					};
					["use-mouse"]: ModuleScript & {
						["use-mouse.spec"]: ModuleScript;
						["use-mouse"]: ModuleScript;
					};
				};
				RoactCompat: ModuleScript & {
					warnOnce: ModuleScript;
					Portal: ModuleScript;
					setGlobalConfig: ModuleScript;
					oneChild: ModuleScript;
					createFragment: ModuleScript;
					RoactTree: ModuleScript;
				};
				RoactTS: ModuleScript & {
					types: Folder;
				};
				beacon: Folder & {
					out: ModuleScript;
				};
				["roact-spring"]: Folder & {
					src: ModuleScript & {
						Promise: ModuleScript;
						Animation: ModuleScript;
						Controller: ModuleScript;
						SpringValue: ModuleScript;
						helpers: ModuleScript;
						constants: ModuleScript;
						AnimationConfig: ModuleScript;
						hooks: Folder & {
							useSpring: ModuleScript;
							useTrail: ModuleScript;
							useSprings: ModuleScript;
						};
						types: Folder & {
							common: ModuleScript;
						};
						React: ModuleScript;
						isRoact17: ModuleScript;
						util: ModuleScript & {
							map: ModuleScript;
							merge: ModuleScript;
						};
						Signal: ModuleScript;
					};
				};
				maid: Folder & {
					Maid: ModuleScript;
				};
				Shared: ModuleScript & {
					["UninitializedState.roblox"]: ModuleScript;
					console: ModuleScript;
					ReactComponentStackFrame: ModuleScript;
					invariant: ModuleScript;
					ReactTypes: ModuleScript;
					objectIs: ModuleScript;
					ReactInstanceMap: ModuleScript;
					["Type.roblox"]: ModuleScript;
					["ConsolePatchingDev.roblox"]: ModuleScript;
					["ErrorHandling.roblox"]: ModuleScript;
					shallowEqual: ModuleScript;
					ReactElementType: ModuleScript;
					isValidElementType: ModuleScript;
					invokeGuardedCallbackImpl: ModuleScript;
					getComponentName: ModuleScript;
					formatProdErrorMessage: ModuleScript;
					ReactFeatureFlags: ModuleScript;
					PropMarkers: Folder & {
						Change: ModuleScript;
						Event: ModuleScript;
						Tag: ModuleScript;
					};
					consoleWithStackDev: ModuleScript;
					ReactErrorUtils: ModuleScript;
					["enqueueTask.roblox"]: ModuleScript;
					checkPropTypes: ModuleScript;
					ReactSharedInternals: ModuleScript & {
						ReactDebugCurrentFrame: ModuleScript;
						ReactCurrentOwner: ModuleScript;
						ReactCurrentDispatcher: ModuleScript;
						IsSomeRendererActing: ModuleScript;
						ReactCurrentBatchConfig: ModuleScript;
					};
					ReactVersion: ModuleScript;
					ReactSymbols: ModuleScript;
					["flowtypes.roblox"]: ModuleScript;
					["Symbol.roblox"]: ModuleScript;
					ExecutionEnvironment: ModuleScript;
					ReactFiberHostConfig: ModuleScript & {
						WithNoTestSelectors: ModuleScript;
						WithNoHydration: ModuleScript;
						WithNoPersistence: ModuleScript;
					};
				};
				ReactReconciler: ModuleScript & {
					ReactRootTags: ModuleScript;
					["ReactFiberDevToolsHook.new"]: ModuleScript;
					["ReactFiberWorkLoop.new"]: ModuleScript;
					ReactTestSelectors: ModuleScript;
					["ReactFiberHotReloading.new"]: ModuleScript;
					ReactCapturedValue: ModuleScript;
					["ReactFiberUnwindWork.new"]: ModuleScript;
					["ReactFiberNewContext.new"]: ModuleScript;
					["ReactProfilerTimer.new"]: ModuleScript;
					ReactInternalTypes: ModuleScript;
					["ReactFiber.new"]: ModuleScript;
					["ReactFiberCommitWork.new"]: ModuleScript;
					ReactFiberTransition: ModuleScript;
					forks: Folder & {
						["ReactFiberHostConfig.test"]: ModuleScript;
					};
					["ReactStrictModeWarnings.new"]: ModuleScript;
					ReactPortal: ModuleScript;
					SchedulingProfiler: ModuleScript;
					["SchedulerWithReactIntegration.new"]: ModuleScript;
					ReactWorkTags: ModuleScript;
					ReactFiberHostConfig: ModuleScript;
					ReactTypeOfMode: ModuleScript;
					ReactFiberOffscreenComponent: ModuleScript;
					["ReactUpdateQueue.new"]: ModuleScript;
					ReactFiberLane: ModuleScript;
					["ReactFiberClassComponent.new"]: ModuleScript;
					ReactHookEffectTags: ModuleScript;
					ReactFiberWorkInProgress: ModuleScript;
					ReactFiberTreeReflection: ModuleScript;
					["ReactChildFiber.new"]: ModuleScript;
					MaxInts: ModuleScript;
					["ReactFiberLazyComponent.new"]: ModuleScript;
					ReactFiberErrorDialog: ModuleScript;
					["ReactFiberBeginWork.new"]: ModuleScript;
					ReactFiberFlags: ModuleScript;
					DebugTracing: ModuleScript;
					ReactFiberErrorLogger: ModuleScript;
					["ReactFiberHooks.new"]: ModuleScript;
					["ReactFiberSchedulerPriorities.roblox"]: ModuleScript;
					["ReactFiberHydrationContext.new"]: ModuleScript;
					ReactFiberReconciler: ModuleScript;
					["ReactFiberContext.new"]: ModuleScript;
					["ReactFiberSuspenseContext.new"]: ModuleScript;
					["ReactFiberStack.new"]: ModuleScript;
					["ReactFiberHostContext.new"]: ModuleScript;
					["ReactMutableSource.new"]: ModuleScript;
					ReactCurrentFiber: ModuleScript;
					ReactFiberComponentStack: ModuleScript;
					["ReactFiberSuspenseComponent.new"]: ModuleScript;
					["ReactFiberCompleteWork.new"]: ModuleScript;
					["ReactFiberReconciler.new"]: ModuleScript;
					["ReactFiberRoot.new"]: ModuleScript;
					["ReactFiberThrow.new"]: ModuleScript;
				};
				["set-timeout"]: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							services: ModuleScript;
						};
					};
					out: ModuleScript & {
						["set-countdown"]: ModuleScript;
						["set-interval"]: ModuleScript;
						["debounce.spec"]: ModuleScript;
						["set-timeout"]: ModuleScript;
						throttle: ModuleScript;
						["set-timeout.spec"]: ModuleScript;
						["throttle.spec"]: ModuleScript;
						["set-interval.spec"]: ModuleScript;
						["set-countdown.spec"]: ModuleScript;
						debounce: ModuleScript;
					};
				};
				Promise: ModuleScript;
				catppuccin: Folder & {
					out: ModuleScript;
				};
				React: ModuleScript & {
					["None.roblox"]: ModuleScript;
					ReactLazy: ModuleScript;
					ReactElementValidator: ModuleScript;
					["createSignal.roblox"]: ModuleScript;
					ReactElement: ModuleScript;
					ReactMutableSource: ModuleScript;
					ReactContext: ModuleScript;
					ReactBaseClasses: ModuleScript;
					ReactNoopUpdateQueue: ModuleScript;
					ReactMemo: ModuleScript;
					ReactCreateRef: ModuleScript;
					ReactForwardRef: ModuleScript;
					React: ModuleScript;
					["ReactBinding.roblox"]: ModuleScript;
					ReactHooks: ModuleScript;
					ReactChildren: ModuleScript;
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				["object-utils"]: ModuleScript;
				flipper: Folder & {
					typings: Folder;
					src: ModuleScript & {
						isMotor: ModuleScript;
						Spring: ModuleScript;
						GroupMotor: ModuleScript;
						Signal: ModuleScript;
						SingleMotor: ModuleScript;
						Instant: ModuleScript;
						Linear: ModuleScript;
						BaseMotor: ModuleScript;
					};
				};
			};
		};
	};
}
