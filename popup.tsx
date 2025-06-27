import { useStorage } from "@plasmohq/storage/hook"
import { useMemo } from "react"

function IndexPopup() {
  const [youtrackToken, setYoutrackToken] = useStorage("youtrack_token", "")
  const [baseURL, setBaseURL] = useStorage("base_url", "")

  const tokenUrl = useMemo(() => {
    try {
      const url = new URL(baseURL)
      return `https://${url.hostname}/youtrack/users/me?tab=account-security`
    } catch (e) {
      // ignore invalid url errors
    }
    return null
  }, [baseURL])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        minHeight: "30rem",
        minWidth: "20rem"
      }}>
      {tokenUrl != null && (
        <h2>
          Youtrack plugin{" "}
          <a href={tokenUrl} target="_blank">
            Get Your Token here
          </a>{" "}
        </h2>
      )}

      <label htmlFor="youtrack_token">Youtrack base URL</label>
      <input
        onChange={(e) => setBaseURL(e.target.value)}
        id="base_url"
        value={baseURL}
      />
      <label htmlFor="youtrack_token">Insert your youtrack token</label>
      <input
        onChange={(e) => setYoutrackToken(e.target.value)}
        id="youtrack_token"
        value={youtrackToken}
      />
    </div>
  )
}

export default IndexPopup
