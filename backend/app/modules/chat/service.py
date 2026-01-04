from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

# ※ ここで client = WebClient() を初期化しません（トークンが動的であるため）

def send_slack_message(token: str, channel_id: str, message: str):
    """
    グループごとのトークンを使用してSlackにメッセージを送信する
    """
    if not token or not channel_id:
        # 連携されていない場合は何もしない
        return

    client = WebClient(token=token)
    
    try:
        client.chat_postMessage(
            channel=channel_id,
            text=message
        )
    except SlackApiError as e:
        print(f"Error sending message: {e.response['error']}")

def notify_new_task(token: str, channel_id: str, task_title: str, task_date: str, group_name: str):
    """新規タスク作成時の通知"""
    msg = (
        f"🆕 *新しいタスクが登録されました*\n"
        f"━━━━━━━━━━━━━━━━━━\n"
        f"📌 *{task_title}*\n"
        f"📅 日付: {task_date}\n"
        f"🏢 グループ: {group_name}\n"
        f"━━━━━━━━━━━━━━━━━━"
    )
    send_slack_message(token, channel_id, msg)

def notify_reminder(token: str, channel_id: str, task_title: str, task_date: str, days_left: int):
    """リマインダー通知"""
    if days_left == 0:
        prefix = "🚨 *【本日】タスクの期限です！*"
    elif days_left == 1:
        prefix = "⚠️ *【明日】タスクの期限です*"
    elif days_left == 7:
        prefix = "📅 *【来週】タスクまであと1週間です*"
    else:
        return

    msg = (
        f"{prefix}\n"
        f"📌 *{task_title}*\n"
        f"📅 日付: {task_date}"
    )
    send_slack_message(token, channel_id, msg)