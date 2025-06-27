import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"
import styleText from "data-text:~/contents/statuses.css"

import "~/contents/statuses.css"
import { get_issue_state_class, fields } from "~youtrack/issue"
import { useStorage } from "~node_modules/@plasmohq/storage/dist/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://*.youtrack.cloud/*"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
  const anchorList = document.querySelectorAll(`[data-test=linked-ticket]`)
  console.log("anchorList", anchorList)
  return anchorList
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

const IssuePageSubtask = ({ anchor }) => {
  let issueId = anchor.element
    .querySelector(`[data-test~=item-id-link]`)
    .textContent.trim()
  console.log("issueId", issueId)
  const [access_token] = useStorage<string>("youtrack_token")
  const [base_url] = useStorage<string>("base_url")

  if (!issueId) return
  if (!base_url) return
  if (!access_token) return

  let yturl = base_url.endsWith("/") ? base_url.slice(0, -1) : base_url

  fetch(
    yturl +
      "/youtrack/api/issues/" +
      issueId +
      "?$top=-1&$topLinks=0&fields=" +
      fields,
    {
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json"
      }
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let state = data.fields.find((obj) => {
        return obj.name === "State"
      })

      let style = get_issue_state_class(state.value.name)

      let span = document.createElement("span")
      span.className = "ch-badge " + style
      span.textContent = state.value.name
      anchor.element.prepend(span)
    })
}

export default IssuePageSubtask
