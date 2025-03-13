// Para ContenedorChat
import { X } from "lucide-react";
import { estadoAuth } from "../estados/estadoAuth";
import { estadoChat } from "../estados/estadoChat";

const HeaderChat = () => {
    const { selectedUser, setSelectedUser } = estadoChat();
    const { onlineUsers } = estadoAuth();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Info del contacto */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.fotoPerfil || "/avatar.png"} alt={selectedUser.username} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium">{selectedUser.username}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Cerrar chat */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default HeaderChat;