"use client";
import React, { useState } from "react";
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react";
import { CopyIcon } from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  const [selectedModels, setSelectedModels] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [sliderValues, setSliderValues] = useState({
    temperature: 33,
    topP: 33,
    topK: 33,
    maxLength: 33,
    frequencyPenalty: 33,
    presencePenalty: 33,
  });
  const [Prompt, setPrompt] = useState({
    system: "",
    user: "",
  });
  const [finalInput, setFinalInput] = useState({});

  const handleCheckboxChange = (model) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter((item) => item !== model);
      } else {
        return [...prevSelectedModels, model];
      }
    });
  };
  const handleFinalInput = () => {
    setFinalInput({
      model: selectedModels,
      input: inputValues,
      slider: sliderValues,
      prompt: Prompt,
    });
  };
  const handlePromptChange = (name, value) => {
    setPrompt((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSlider = (name, value) => {
    setSliderValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInputChange = (model, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [model]: value,
    }));
  };

  const handleSubmission = () => {
    // Here you can use the selectedModels state for further processing
    console.log("Selected Models:", selectedModels);
    console.log("Input Values:", inputValues);
  };

  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Models"
                >
                  <Bot className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Models
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="API"
                >
                  <Code2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                API
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Documentation"
                >
                  <Book className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  aria-label="Settings"
                >
                  <Settings2 className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Account"
                >
                  <SquareUser className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="model">Model</Label>
                    <Select>
                      <SelectTrigger
                        id="model"
                        className="items-start [&_[data-description]]:hidden"
                      >
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genesis">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Rabbit className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Genesis
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Our fastest model for general use cases.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="explorer">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Bird className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Explorer
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                Performance and speed for efficiency.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="quantum">
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <Turtle className="size-5" />
                            <div className="grid gap-0.5">
                              <p>
                                Neural{" "}
                                <span className="font-medium text-foreground">
                                  Quantum
                                </span>
                              </p>
                              <p className="text-xs" data-description>
                                The most powerful model for complex
                                computations.
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" placeholder="0.4" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Slider
                      defaultValue={[33]}
                      max={100}
                      step={1}
                      onValueChange={() => console.log(value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Slider defaultValue={[33]} max={100} step={1} />
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role- System</Label>
                    {/* <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select> */}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="You are a..." />
                  </div>
                </fieldset>
              </form>
            </DrawerContent>
          </Drawer>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Model</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Select Model</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Choose Model</DialogTitle>
                        <DialogDescription>
                          Choose your one or more model you want to compare.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms1"
                          onClick={() => handleCheckboxChange("GPT-3.5-TURBO")}
                        />
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          GPT-3.5-TURBO
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms2"
                          onClick={() => handleCheckboxChange("GEMINI-1.5-PRO")}
                        />
                        <label
                          htmlFor="terms2"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          GEMINI-1.5-PRO
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms3"
                          onClick={() => handleCheckboxChange("CLAUDE")}
                        />
                        <label
                          htmlFor="terms3"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          CLAUDE
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms4"
                          onClick={() => handleCheckboxChange(" ANTHROPIC")}
                        />
                        <label
                          htmlFor="terms4"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          ANTHROPIC
                        </label>
                      </div>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleSubmission}
                        >
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </div>
                <Label htmlFor="model">Credentials</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Api Key</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Credentials Here</DialogTitle>
                      <DialogDescription>
                        Enter your API KEY associated with the models.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        {selectedModels.map((item, index) => (
                          <Input
                            key={index}
                            onChange={(e) =>
                              handleInputChange(item, e.target.value)
                            }
                            id="link"
                            placeholder={`type your ${item}`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* <DialogFooter className="sm:justify-start"> */}
                    {/* <DialogClose asChild> */}
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleSubmission}
                      >
                        Submit
                      </Button>
                    </DialogClose>
                    {/* </DialogClose> */}
                    {/* </DialogFooter> */}
                  </DialogContent>
                </Dialog>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">
                    Temperature : {sliderValues.temperature}
                  </Label>
                  <Slider
                    defaultValue={[33]}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      handleSlider("temperature", value)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P : {sliderValues.topP}</Label>

                    <Slider
                      defaultValue={[33]}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleSlider("topP", value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K : {sliderValues.topK}</Label>
                    <Slider
                      defaultValue={[33]}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleSlider("topK", value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">
                      Max Length : {sliderValues.maxLength}
                    </Label>
                    <Slider
                      defaultValue={[33]}
                      max={100}
                      step={1}
                      onValueChange={(value) =>
                        handleSlider("maxLength", value)
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">
                      Frequency penalty : {sliderValues.frequencyPenalty}
                    </Label>
                    <Slider
                      defaultValue={[33]}
                      max={100}
                      step={1}
                      onValueChange={(value) =>
                        handleSlider("frequencyPenalty", value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">
                      Presence penalty : {sliderValues.presencePenalty}
                    </Label>
                    <Slider
                      defaultValue={[33]}
                      max={100}
                      step={1}
                      onValueChange={(value) =>
                        handleSlider("presencePenalty", value)
                      }
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">System Role</Label>
                  {/* <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select> */}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="You are a..."
                    className="min-h-[9.5rem]"
                    onChange={(e) =>
                      handlePromptChange("system", e.target.value)
                    }
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative flex  min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="grid gap-2 grid-cols-2    max-h-[70vh] overflow-auto">
              {selectedModels.map((item, index) => (
                <ScrollArea
                  key={index}
                  className="h-[200px] w-[350px] rounded-md border p-4"
                >
                  <p className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    {item}
                  </p>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    The king, seeing how much happier his subjects were,
                    realized the error of his ways and repealed the joke tax.
                  </p>
                </ScrollArea>
              ))}
            </div>

            <div className="flex-1" />
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                onChange={(e) => handlePromptChange("user", e.target.value)}
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
