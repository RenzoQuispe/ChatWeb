// Para HomePage
import { MessageSquare } from "lucide-react";
import { estadoAuth } from "../estados/estadoAuth";

const chatNoSeleccionado = () => {
    const { authUser } = estadoAuth();
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
                 justify-center animate-bounce"
                        >
                            <MessageSquare className="w-8 h-8 text-primary " />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold">Bienvenido {authUser?.username} a SimpleChatWeb!</h2>
                <p className="text-base-content/60">
                    Seleccionar una conversacion de la barra de contactos :D
                </p>
            </div>
        </div>
    );
}
export default chatNoSeleccionado;