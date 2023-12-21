import Dexie, { Table } from "dexie";
import * as models from "../../utils/services/chat/Models.ts"

class DBChatService extends Dexie {
    messages!: Table<models.ChatMessage>;
    channels!: Table<models.ChatChannel>;
    employees!: Table<models.Employee>;

    constructor( employee_id: number ) {
        super( `ChatDB${employee_id}` );
        this.version( 1 ).stores( {
            messages: "&message_id, message_content, send_date, document, channel, sender",
            channels: "&channel_id, channel_name, description, channel_type",
            employees: "&employee_id, name, email, role, department, photo_link"
        } );
    }
}

export default DBChatService;