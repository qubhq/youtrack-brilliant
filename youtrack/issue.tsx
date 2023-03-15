export function get_issue_state_class(status) {
    let color_style = '';
    switch (status) {
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

    return color_style;
}

export function get_issue_priority_class(status) {
    let color_style = '';
    switch (status) {
        // Show-stopper
        // Critical
        // Major
        // Normal
        // Minor
        case "Show Stopper":
            color_style = 'ch-show-stopper';
            break;
        case "Critical":
            color_style = 'ch-critical';
            break;
        case "Major":
            color_style = 'ch-major';
            break;
        case "Normal":
            color_style = 'ch-normal';
            break;
        case "Minor":
            color_style = 'ch-minor';
            break;
        default:
            color_style = 'ch-default';
    }

    return color_style;
}

export const fields = 'fields($type,hasStateMachine,id,isUpdatable,name,' +
    'projectCustomField($type,bundle(id),canBeEmpty,emptyFieldText,' +
    'field(fieldType(isMultiValue,valueType),id,localizedName,name,ordinal),' +
    'id,isEstimation,isPublic,isSpentTime,ordinal,size),value($type,archived,' +
    'avatarUrl,buildIntegration,buildLink,color(background,id),description,' +
    'fullName,id,isResolved,localizedName,login,minutes,name,presentation,ringId,text))';