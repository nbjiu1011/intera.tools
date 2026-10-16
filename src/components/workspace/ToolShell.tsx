"use client";

import { ArrowRight } from "lucide-react";
import type { ToolSlug } from "@/lib/tools";
import { PrimaryButton, ProcessingOverlay, Stepper, WorkspaceFrame } from "./frame";
import { Dropzone, RejectionNotice, useFileIntake, type IntakeConfig } from "./intake";
import { useJob } from "./job";
import { ResultView } from "./ResultView";

/**
 * Stage switcher shared by tools with custom file areas:
 * empty → dropzone, files → workspace, running → progress overlay, done → results.
 */
export function ToolShell({
  slug,
  config,
  intake,
  job,
  count,
  totalBytes,
  onClear,
  files,
  options,
  actionLabel,
  onRun,
  blocker,
  doneTitle,
  showSavings,
  zipName,
  hideToolbar,
}: {
  slug: ToolSlug;
  config: IntakeConfig;
  intake: ReturnType<typeof useFileIntake>;
  job: ReturnType<typeof useJob>;
  count: number;
  totalBytes: number;
  onClear: () => void;
  files: React.ReactNode;
  options: React.ReactNode;
  actionLabel: string;
  onRun: () => void;
  blocker?: string | null;
  doneTitle: string;
  showSavings?: boolean;
  zipName?: string;
  hideToolbar?: boolean;
}) {
  const state = job.state;
  const reset = () => {
    job.reset();
    onClear();
    intake.clearRejections();
  };

  if (state.stage === "done") {
    return (
      <>
        <Stepper step={3} />
        <ResultView
          tool={slug}
          title={doneTitle}
          outputs={state.outputs}
          failures={state.failures}
          showSavings={showSavings}
          zipName={zipName ?? `intera-tools-${slug}-${new Date().toISOString().slice(0, 10)}.zip`}
          onStartOver={reset}
          onAdjust={() => job.reset()}
        />
      </>
    );
  }

  if (!count) {
    return (
      <>
        <Stepper step={1} />
        {intake.rejections.length > 0 && (
          <div className="mb-4">
            <RejectionNotice rejections={intake.rejections} onDismiss={intake.clearRejections} />
          </div>
        )}
        <Dropzone config={config} onFiles={(f, source) => intake.add(f, source)} />
      </>
    );
  }

  return (
    <>
      <Stepper step={2} />
      <WorkspaceFrame
        config={config}
        count={count}
        totalBytes={totalBytes}
        onAdd={(f) => intake.add(f, "drop")}
        onClear={reset}
        rejections={intake.rejections}
        onDismissRejections={intake.clearRejections}
        hideToolbar={hideToolbar}
        files={files}
        options={options}
        action={
          <div className="grid gap-2">
            {blocker && <p className="text-center text-xs text-warning">{blocker}</p>}
            <PrimaryButton onClick={onRun} disabled={Boolean(blocker)} icon={<ArrowRight className="size-5" />}>
              {actionLabel}
            </PrimaryButton>
          </div>
        }
        overlay={
          state.stage === "running" ? (
            <ProcessingOverlay done={state.done} total={state.total} label={state.label} onCancel={job.cancel} />
          ) : null
        }
      />
    </>
  );
}
