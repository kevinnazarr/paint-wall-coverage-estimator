import { useState } from "react";
import { Header, Footer } from "./components/layout.tsx";
import { Card } from "./components/ui/index.tsx";
import { Alert } from "./components/ui/index.tsx";
import { ToastProvider, useToast } from "./components/ui/Toast.tsx";
import {
    WallInputs,
    WallCountSelect,
    CoatsSelect,
    CanSizeSelect,
    CutoutInputs,
    ResultSummary,
} from "./features/paint-estimator/components.tsx";
import { usePaintEstimate } from "./features/paint-estimator/hooks/usePaintEstimate.ts";
function Inner() {
    const {
        wallCount,
        setWallCount,
        walls,
        updateWall,
        coats,
        setCoats,
        doorCount,
        setDoorCount,
        windowCount,
        setWindowCount,
        canType,
        setCanType,
        result,
        hasAnyWall,
        wallError,
        countError,
        activeWalls,
        clearAll,
    } = usePaintEstimate();
    const d = Number(doorCount) || 0,
        e = Number(windowCount) || 0,
        { push } = useToast(),
        [a, b] = useState(false);
    const h = () => b(true),
        k = () => {
            clearAll();
            b(false);
            push("Cleared — back to defaults", "info");
        },
        c = async () => {
            const o =
                canType === "gallon"
                    ? result.cansNeeded === 1
                        ? "gallon"
                        : "gallons"
                    : result.cansNeeded === 1
                        ? "quart"
                        : "quarts",
                t =
                    hasAnyWall &&
                        !result.cutoutExceedsGross &&
                        result.totalCoverageNeededSqFt > 0
                        ? `Paint estimate: ${result.grossAreaSqFt} sq ft gross → ${result.netAreaSqFt} sq ft net ×${coats} = ${result.totalCoverageNeededSqFt} sq ft needed — Buy ${result.cansNeeded} ${o} (${canType} @ ${canType === "gallon" ? 400 : 100} sq ft/can), ~${result.leftoverSqFt} sq ft leftover.`
                        : "Paint estimator — enter wall dimensions to get a recommendation.";
            try {
                await navigator.clipboard.writeText(t);
                push(`Copied: Buy ${result.cansNeeded} ${o}`, "success");
            } catch {
                push("Copy failed — select and copy manually", "info");
            }
        };
    return (
        <div className="min-h-screen">
            <Header onClear={h} onPrint={() => window.print()} />
            <div className="mx-auto max-w-[1120px] px-4 sm:px-6 pb-4 flex sm:hidden gap-2 no-print">
                <button
                    onClick={h}
                    className="flex-1 min-h-[40px] rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm font-medium focus-ring"
                >
                    Clear
                </button>
                <button
                    onClick={() => window.print()}
                    className="flex-1 min-h-[40px] rounded-xl bg-[var(--color-ink)] px-3 text-sm font-semibold text-white focus-ring"
                >
                    Print
                </button>
            </div>
            {a && (
                <div className="mx-auto max-w-[1120px] px-4 sm:px-6 pb-4 no-print">
                    <Alert
                        variant="warn"
                        title="Clear all inputs?"
                        onClose={() => b(false)}
                    >
                        <p>
                            This will reset all walls, coats, doors/windows and can size to
                            defaults.
                        </p>
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={k}
                                className="min-h-[36px] rounded-xl bg-[#78350F] px-4 text-sm font-semibold text-white hover:bg-[#92400E] focus-ring"
                            >
                                Yes, clear
                            </button>
                            <button
                                onClick={() => b(false)}
                                className="min-h-[36px] rounded-xl border border-amber-300 bg-white px-4 text-sm font-medium hover:bg-amber-50 focus-ring"
                            >
                                Cancel
                            </button>
                        </div>
                    </Alert>
                </div>
            )}
            <main className="mx-auto max-w-[1120px] px-4 sm:px-6 pb-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
                <Card>
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--color-ink-muted)]">
                            Your room
                        </h2>
                        <span className="text-xs text-[var(--color-ink-muted)]">
                            Auto-saved
                        </span>
                    </div>
                    <div className="mt-5">
                        <WallCountSelect wallCount={wallCount} onChange={setWallCount} />
                    </div>
                    <div className="mt-6">
                        <WallInputs
                            wallCount={wallCount}
                            walls={walls}
                            onUpdate={updateWall}
                            wallError={wallError}
                        />
                    </div>
                    <div className="mt-6">
                        <CoatsSelect coats={coats} onChange={setCoats} />
                    </div>
                    <div className="mt-6">
                        <CutoutInputs
                            doorCount={doorCount}
                            windowCount={windowCount}
                            onDoor={setDoorCount}
                            onWindow={setWindowCount}
                            countError={countError}
                        />
                    </div>
                    <div className="mt-6">
                        <CanSizeSelect canType={canType} onChange={setCanType} />
                    </div>
                </Card>
                <div className="lg:sticky lg:top-6">
                    <ResultSummary
                        result={result}
                        hasAnyWall={hasAnyWall}
                        activeWalls={activeWalls}
                        canType={canType}
                        coats={coats}
                        doorCount={d}
                        windowCount={e}
                    />
                    <div className="mt-3 flex gap-2 no-print">
                        <button
                            onClick={c}
                            className="flex-1 min-h-[40px] rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm font-medium hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-paper-2)] transition-all focus-ring"
                        >
                            Copy summary
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex-1 min-h-[40px] rounded-xl border border-[var(--color-line)] bg-white px-3 text-sm font-medium hover:border-[var(--color-accent)]/40 transition-all focus-ring"
                        >
                            Print
                        </button>
                    </div>
                    <p className="mt-3 text-center text-xs text-[var(--color-ink-muted)]">
                        Live recalculation — no submit needed. Change any value to update.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default function App() {
    return (
        <ToastProvider>
            <Inner />
        </ToastProvider>
    );
}
