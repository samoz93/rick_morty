import { motion } from "framer-motion";

export const CharacterChip = ({
  name,
  id,
  onClick,
}: {
  name: string;
  id: string;
  onClick: (id: string) => void;
}) => {
  return (
    <motion.div
      className="bg-ricky rounded-lg px-2 py-1 text-xs gap-2 flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <p className="text-black">{name}</p>
      <button
        onClick={() => onClick(id)}
        className="bg-danger text-black text-sm p-2 flex items-center h-[80%] rounded-lg"
      >
        ✗
      </button>
    </motion.div>
  );
};
