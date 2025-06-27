import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  const [youtrackToken, setYoutrackToken] = useStorage("youtrack_token", "")
  const [baseURL, setBaseURL] = useStorage("base_url", "")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        minHeight: "30rem",
        minWidth: "20rem"
      }}>
      <h2>
        Youtrack plugin{" "}
        <a
          href="https://chainstack.youtrack.cloud/youtrack/users/me?tab=account-security"
          target="_blank">
          Get Your Token here
        </a>{" "}
      </h2>

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
