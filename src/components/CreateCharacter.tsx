import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const CreateCharacter = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    episodes: [],
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create a Character</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Character</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              // defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Image link
            </Label>
            <Input
              id="image"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              // defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Episode
            </Label>
            <select>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
        </form>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCharacter;
