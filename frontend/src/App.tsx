/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Gs9fDO94Duf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/navbar";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "./context/data";

export default function Component() {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodo,
  });

  return (
    <>
      <Navbar />
      <main className="container mx-auto my-8 px-4 md:px-0 bg-gray-200 dark:bg-zinc-900 shadow-lg">
        <div className="mb-8 rounded-md p-6">
          <h2 className="mb-4 text-2xl font-bold">To-Do List</h2>
          <form className="mb-4 flex items-center">
            <Input
              className="flex-1 rounded-l-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Add a new task"
              type="text"
            />
            <Button
              className="rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              type="submit"
            >
              Add
            </Button>
          </form>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3">
              {data?.map((todo: any) => (
                <>
                  <div className="flex items-center space-x-3">
                    <Checkbox className="h-5 w-5 rounded text-blue-500" />
                    <span className="text-gray-700">{todo.title}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="text-gray-500 hover:text-gray-700"
                          size="icon"
                          variant="ghost"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              defaultValue="Pedro Duarte"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Username
                            </Label>
                            <Input
                              id="username"
                              defaultValue="@peduarte"
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      className="text-red-500 hover:text-red-700"
                      size="icon"
                      variant="ghost"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
