import { estadoChat } from "../estados/estadoChat";

import BarraContactos from "../components/BarraContactos";
import ChatNoSeleccionado from "../components/ChatNoSeleccionado";
import ContenedorChat from "../components/ContenedorChat";

const HomePage = () => {
  const { selectedUser } = estadoChat();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <BarraContactos />
            {!selectedUser ? <ChatNoSeleccionado /> : <ContenedorChat />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;