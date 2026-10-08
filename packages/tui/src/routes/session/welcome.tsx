import { For, Show, createMemo } from "solid-js"
import { useTheme } from "../../context/theme"
import { useSync } from "../../context/sync"
import { useLocal } from "../../context/local"
import { useTuiPaths } from "../../context/runtime"
import { useRoute } from "../../context/route"
import { useCommandShortcut } from "../../keymap"
import { Locale } from "../../util/locale"
import { closofLogo, closofLogoRight } from "../../logo"

const GITHUB = "https://github.com/anomalyco/opencode"
const BAR_WIDTH = 18

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

const TIPS = [
  { command: "/model", description: "to switch model" },
  { command: "/sessions", description: "to resume" },
  { command: "/new", description: "to start fresh" },
]

export function Welcome() {
  const { theme } = useTheme()
  const sync = useSync()
  const local = useLocal()
  const paths = useTuiPaths()
  const route = useRoute()
  const paletteShortcut = useCommandShortcut("command.palette.show")

  const usage = createMemo(() => {
    const empty = { context: "0 (0%)", filled: 0, pct: "0%" }
    const sessionID = route.data.type === "session" ? route.data.sessionID : undefined
    if (!sessionID) return empty
    const session = sync.session.get(sessionID)
    const msg = sync.data.message[sessionID] ?? []
    const last = msg.findLast((item) => item.role === "assistant" && item.tokens.output > 0)
    if (!last || last.role !== "assistant") return empty
    const tokens =
      last.tokens.input + last.tokens.output + last.tokens.reasoning + last.tokens.cache.read + last.tokens.cache.write
    if (tokens <= 0) return empty
    const model = sync.data.provider.find((item) => item.id === last.providerID)?.models[last.modelID]
    const limit = model?.limit.context ?? 0
    const ratio = limit > 0 ? Math.min(1, tokens / limit) : 0
    const pct = limit > 0 ? `${Math.round(ratio * 100)}%` : undefined
    const cost = session?.cost ?? 0
    return {
      context: limit > 0 ? `${Locale.number(tokens)} (${pct})` : Locale.number(tokens),
      cost: cost > 0 ? money.format(cost) : undefined,
      filled: Math.max(0, Math.round(ratio * BAR_WIDTH)),
      pct: pct ?? "",
    }
  })

  const modelLabel = createMemo(() => {
    const current = local.model.current()
    if (!current) return "No model selected"
    const provider = sync.data.provider.find((item) => item.id === current.providerID)
    const info = provider?.models[current.modelID]
    const variant = local.model.variant.current()
    const name = info?.name ?? current.modelID
    return variant ? `${name} · ${variant}` : name
  })

  const providerLabel = createMemo(() => {
    const current = local.model.current()
    if (!current) return undefined
    return sync.data.provider.find((item) => item.id === current.providerID)?.name ?? current.providerID
  })

  const directory = createMemo(() => {
    const value = sync.path.directory || paths.cwd
    if (value.length <= 52) return value
    return `${value.slice(0, 20)}…${value.slice(-30)}`
  })

  const logoWidth = createMemo(() => Math.max(...closofLogo.map((line) => line.length)) + 1)

  return (
    <box width="100%" maxWidth={110} flexDirection="column" flexShrink={0}>
      <box
        width="100%"
        flexDirection="column"
        border
        borderColor={theme.border}
        title=" ClosofCode local "
        titleAlignment="left"
        paddingLeft={1}
        paddingRight={1}
        paddingTop={1}
        paddingBottom={1}
      >
        <box width="100%" flexDirection="row" gap={2}>
          <box flexDirection="column" flexShrink={0} minWidth={logoWidth()}>
            <For each={closofLogo}>
              {(line, index) => (
                <box flexDirection="row">
                  <text fg={theme.text} selectable={false}>
                    <span>{line}</span>
                    <span>{closofLogoRight[index()]}</span>
                  </text>
                </box>
              )}
            </For>
          </box>

          <box flexGrow={1} flexDirection="column" minWidth={0}>
            <text fg={theme.text}>
              <span style={{ fg: theme.text, bold: true }}>Tips for getting started</span>
            </text>
            <box height={1} />
            <For each={TIPS}>
              {(tip) => (
                <text fg={theme.textMuted} wrapMode="none">
                  <span>Type </span>
                  <span style={{ fg: theme.text }}>{tip.command}</span>
                  <span> {tip.description}</span>
                </text>
              )}
            </For>
            <text fg={theme.textMuted} wrapMode="none">
              <span>Press </span>
              <span style={{ fg: theme.text }}>{paletteShortcut()}</span>
              <span> for commands</span>
            </text>
          </box>

          <box
            flexShrink={0}
            flexDirection="column"
            alignItems="flex-start"
            minWidth={30}
            border={["left"]}
            borderColor={theme.border}
            paddingLeft={2}
          >
            <text fg={theme.text} wrapMode="none">
              {modelLabel()}
            </text>
            <Show when={usage()}>
              {(item) => (
                <>
                  <text fg={theme.textMuted} wrapMode="none">
                    {item().context}
                  </text>
                  <text fg={theme.textMuted} wrapMode="none">
                    <span style={{ fg: theme.text }}>{"░".repeat(item().filled)}</span>
                    <span style={{ fg: theme.border }}>{"░".repeat(Math.max(0, BAR_WIDTH - item().filled))}</span>
                    <span> {item().pct}</span>
                  </text>
                </>
              )}
            </Show>
          </box>
        </box>

        <box height={1} />

        <text fg={theme.textMuted} wrapMode="none">
          <span style={{ fg: theme.text }}>github: </span>
          <span>{GITHUB}</span>
        </text>

        <box height={1} />

        <box width="100%" flexDirection="column" border={["top"]} borderColor={theme.border}>
          <box height={1} />
          <text fg={theme.text}>
            <span style={{ fg: theme.text, bold: true }}>Environment</span>
          </text>
          <Show when={providerLabel()}>
            {(provider) => (
              <text fg={theme.textMuted} wrapMode="none">
                <span style={{ fg: theme.text }}>{provider()}</span>
                <span> · {modelLabel()}</span>
              </text>
            )}
          </Show>
          <Show when={!providerLabel()}>
            <text fg={theme.textMuted} wrapMode="none">
              {modelLabel()}
            </text>
          </Show>
          <text fg={theme.textMuted} wrapMode="none">
            {directory()}
          </text>
          <text fg={theme.textMuted} wrapMode="none">
            <span>Press </span>
            <span style={{ fg: theme.text }}>/</span>
            <span> for commands, </span>
            <span style={{ fg: theme.text }}>@</span>
            <span> to mention files</span>
          </text>
        </box>
      </box>
    </box>
  )
}
