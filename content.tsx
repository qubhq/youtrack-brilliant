import type {PlasmoCSConfig, PlasmoGetInlineAnchorList} from "plasmo"
import styleText from "data-text:~/style.css"

import "./style.css"

export const config: PlasmoCSConfig = {
    matches: ["https://chainstack.myjetbrains.com/*"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
    document.querySelectorAll(`.yt-issue-links-list div.yt-issue .yt-issue-links-list-content__summary`)

export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = styleText
    return style
}

const PlasmoInline = ({anchor}) => {
    // console.log("PlasmoInline", anchor.element);
    let issueId = anchor.element.querySelector(`.js-issue-id`).textContent;
    // console.log("PlasmoInline", issueId);

    let fields = 'fields($type,hasStateMachine,id,isUpdatable,name,' +
        'projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,' +
        'field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),' +
        'id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,' +
        'avatarUrl,buildIntegration,buildLink,color(background,id),description,' +
        'fullName,id,isResolved,localizedName,login,minutes,name,presentation,ringId,text))';

    chrome.storage.local.get(['youtrack_token']).then((result) => {
        // console.log('chrome.storage.local called with data ', result.youtrack_token);
        let access_token = result.youtrack_token;

        fetch('https://chainstack.myjetbrains.com/youtrack/api/issues/' + issueId + '?$top=-1&$topLinks=0&fields=' + fields, {
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

                // console.log("PlasmoInline fetch result, State: " + issueId, state.value.name);

                let color_style = '';
                switch (state.value.name) {
                    case "Open":
                        color_style = 'ch-open';
                        break;
                    case "In Progress":
                        color_style = 'ch-in_progress';
                        break;
                    case "Code Review":
                        color_style = 'ch-blocked';
                        break;
                    case "To Verify":
                        color_style = 'ch-to_verify';
                        break;
                    case "Ready to Release":
                        color_style = 'ch-ready_to_release';
                        break;
                    case "Rejected":
                        color_style = 'ch-rejected';
                        break;
                    default:
                        color_style = 'ch-default';
                }

                let span = document.createElement("span");
                span.className = 'ch-badge ' + color_style;
                span.textContent = state.value.name
                anchor.element.prepend(span);
            });
    });
}

export default PlasmoInline
