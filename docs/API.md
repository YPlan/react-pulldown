# API Reference

* [Pulldown](#pulldown)
* [PulldownStage](#pulldownstage)
* [PulldownGoto](#pulldowngoto)
* [PulldownClose](#pulldownclose)

## Pulldown

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| className | string | | The class applied to the root element. |
| defaultStage | string | x | The name of the first stage. |
| delay | number | | The number of milliseconds to pass before the component appears. |
| onChange | func | | The callback fired everytime the current stage changes. |
| onClose | func | | The callback fired when the pulldown closes. |
| onOpen | func | | The callback fired when the pulldown opens. |

## PulldownStage

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| className | string | | The class applied to the root element. |
| direction | string | x | The direction from where the stage will appear. |
| height | number | x | The height in pixels. |
| name | string | | The name of the stage. |

## PulldownGoto

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| className | string | | The class applied to the root element. |
| name | string | x | The destination stage. |

## PulldownClose

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| className | string | | The class applied to the root element. |
