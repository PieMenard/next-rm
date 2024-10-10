import { Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';

type DeleteCharacterProps = {
  id: number;
  refetchCharacters: () => void;
};

const DeleteCharacter = ({ id, refetchCharacters }: DeleteCharacterProps) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      const res = await fetch(`/api/characters/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        refetchCharacters();
        console.log('character deleted');
      }
    }
  };
  return (
    <Button
      size="sm"
      variant="destructive"
      className="bg-transparent px-1 shadow-none"
      onClick={handleDelete}
    >
      <Trash2Icon color="red" />
    </Button>
  );
};

export default DeleteCharacter;
