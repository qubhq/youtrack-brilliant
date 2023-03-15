import type {PlasmoCSConfig, PlasmoGetInlineAnchorList} from "plasmo"
import styleText from "data-text:~/contents/statuses.css"

import "~/contents/statuses.css"
import {get_issue_state_class, get_issue_priority_class, fields} from "~youtrack/issue";
import {useStorage} from "~node_modules/@plasmohq/storage/dist/hook";

export const config: PlasmoCSConfig = {
    matches: ["https://*.myjetbrains.com/*"],
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
    document.querySelectorAll(`.yt-agile-table__row-title__summary .yt-swimlane-issue-id`)

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = styleText
    return style
}

const AgileBoardSwimlane = ({anchor}) => {
    if(!anchor.element) return;
    let issueId = anchor.element.textContent.trim();
    const [access_token] = useStorage<string>("youtrack_token");
    const [base_url] = useStorage<string>("base_url");

    if(!issueId) return;
    if(!base_url) return;
    if(!access_token) return;

    let yturl = base_url.endsWith('/') ? base_url.slice(0, -1) : base_url;

    fetch(yturl + '/youtrack/api/issues/' + issueId + '?$top=-1&$topLinks=0&fields=' + fields, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => {

            let state = data.fields.find(obj => {
                return obj.name === 'State'
            });

            let priority = data.fields.find(obj => {
                return obj.name === 'Priority'
            });

            let style = get_issue_state_class(state.value.name);

            let span_state = document.createElement("span");
            span_state.className = 'ch-badge ' + style;
            span_state.textContent = state.value.name
            anchor.element.prepend(span_state);

            let priority_style = get_issue_priority_class(priority.value.name);

            let span_priority = document.createElement("span");
            span_priority.className = 'ch-badge ' + priority_style;
            span_priority.textContent = priority.value.name
            anchor.element.prepend(span_priority);
        });

}

export default AgileBoardSwimlane
