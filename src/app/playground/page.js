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


import { Checkbox } from "../../components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../components/ui/dialog";

import { Slider } from "../../components/ui/slider";
import { ScrollArea } from "../../components/ui/scroll-area";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton.jsx"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../../components/ui/tooltip";
import axios from "axios";
export default function Dashboard() {
  const [selectedModels, setSelectedModels] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [selectedsubmodels, setselectedsubmodels] = useState([]);
  const [selectedmodelsfinal, setselectedmodelsfinal] = useState([]);
  const [output, setoutput] = useState([]);
  const[loader,setloader]=useState(false)
  const [isFirstDialogOpen, setFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setSecondDialogOpen] = useState(false);
  const[error,seterror]= useState("")
  const[errorflag,seterrorflag]= useState(false)
  const [sliderValues, setSliderValues] = useState({
    temperature: [0.3],
    topP: [0.3],
    topK: [1],
    maxLength: [100],
    frequencyPenalty: [0.3],
    presencePenalty: [0.3],
  });
  const [Prompt, setPrompt] = useState({
    system: "",
    user: "",
  });


  const handleFirstDialogSubmit = () => {
    setFirstDialogOpen(false);

    for (let i = 0; i < selectedModels.length; i++) {
      console.log(selectedModels[i]);
      if (selectedModels[i] == "OPENAI") {
        setselectedsubmodels((prev) => [
          ...prev,
          "gpt-3.5-turbo",
          "gpt-4o",
          "gpt-4-turbo",
        ]);
      }
      if (selectedModels[i] == "ANTHROPIC") {
        setselectedsubmodels((prev) => [
          ...prev,
          "claude-3-opus-20240229",
          "claude-3-sonnet-20240229",
          "claude-3-haiku-20240307",
        ]);
      }
      if (selectedModels[i] == "GOOGLEAI") {
        setselectedsubmodels((prev) => [...prev, "gemini-1.0-pro"]);
      }
      if (selectedModels[i] == "GROQ") {
        setselectedsubmodels((prev) => [...prev, "llama3-8b-8192","llama3-70b-8192","mixtral-8x7b-32768","gemma-7b-it"]);
      }
    }
    setSecondDialogOpen(true);
  };

  const handleCheckboxChange = (model) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter((item) => item !== model);
      } else {
        return [...prevSelectedModels, model];
      }
    });
  };
  const handleSubCheckboxChange = (model) => {
    setselectedmodelsfinal((prevSelectedModels) => {
      if (prevSelectedModels.includes(model)) {
        return prevSelectedModels.filter((item) => item !== model);
      } else {
        return [...prevSelectedModels, model];
      }
    });
  };
  const handleFinalInput = () => {
    return {
      key: inputValues,
      model: selectedmodelsfinal,
      prompt: Prompt,
      slider: sliderValues,
    };
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
    setInputValues((prev) => [...prev, value]);

  };
  let responses = [];
  const handleRequest = async () => {
    try {
      const final = handleFinalInput();
      console.log(final);
      setloader(true)
      for (let i = 0; i < selectedModels.length; i++) {
        if (selectedModels[i] == "GOOGLEAI") {
          const response = await axios.post("/api/googleai", { final });
          // console.log(response.data);
          console.log(responses);
          responses.push(...(response.data || []));
        }
        if (selectedModels[i] == "ANTHROPIC") {
          const response = await axios.post("/api/anthropic", { final });
          // console.log(response.data);
          responses.push(...(response.data || []));
        }
        if (selectedModels[i] == "OPENAI") {
          const response = await axios.post("/api/openai", { final });
          // console.log(response.data);
          console.log(responses);
          responses.push(...(response.data || []));
        }
        if (selectedModels[i] == "GROQ") {
          const response = await axios.post("/api/groq", { final });
          // console.log(response.data);
          console.log(responses);
          responses.push(...(response.data || []));
        }
      }
      console.log(responses);
      const filteredResponses = responses.filter(
        (response) => response !== null
      );
      setoutput(filteredResponses);
      setloader(false)
    } catch (error) {
      console.error(error);
      seterror(error);
      seterrorflag(true);
    }
  };
  
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <img src="logo.png"/>
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
                  <Dialog
                    open={isFirstDialogOpen}
                    onOpenChange={setFirstDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {setFirstDialogOpen(true); setSelectedModels([]); setselectedsubmodels([]); }}
                      >
                        Select Model
                      </Button>
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
                          onClick={() => handleCheckboxChange("OPENAI")}
                        />
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          OPENAI
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms2"
                          onClick={() => handleCheckboxChange("ANTHROPIC")}
                        />
                        <label
                          htmlFor="terms2"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          ANTHROPIC
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms3"
                          onClick={() => handleCheckboxChange("GOOGLEAI")}
                        />
                        <label
                          htmlFor="terms3"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          GOOGLEAI
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms4"
                          onClick={() => handleCheckboxChange("GROQ")}
                        />
                        <label
                          htmlFor="terms4"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          GROQAI
                        </label>
                        
                      </div>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleFirstDialogSubmit}
                        >
                          Next
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                    
                  <Dialog
                    open={errorflag}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>ERROR</DialogTitle>
                        <DialogDescription>
                        ERROR while fetching response from the server
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Check your api key 
                        </label>
                      </div>
                    </DialogContent>
                    <DialogClose asChild></DialogClose>
                  </Dialog>













                  <Dialog
                    open={isSecondDialogOpen}
                    onOpenChange={setSecondDialogOpen}
                  >
                    <DialogContent className=" max-h-80 overflow-auto">
                      <DialogHeader>
                        <DialogTitle>Second Dialog</DialogTitle>
                        <DialogDescription>
                          This is the second dialog that opens after the first
                          one is closed.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedsubmodels.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id="terms1"
                            onClick={() => handleSubCheckboxChange(item)}
                          />
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setSecondDialogOpen(false)}
                        >
                          Done
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
                      <Button type="button" variant="secondary">
                        Done
                      </Button>
                    </DialogClose>
                    {/* </DialogClose> */}
                    {/* </DialogFooter> */}
                  </DialogContent>
                </Dialog>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">
                    Temperature{" "}
                    <span className="ml-80"> {sliderValues.temperature}</span>
                  </Label>
                  <Slider
                    defaultValue={[0.3]}
                    max={2}
                    step={0.1}
                    onValueChange={(value) =>
                      handleSlider("temperature", value)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">
                      Top P <span className="ml-36"> {sliderValues.topP}</span>
                    </Label>

                    <Slider
                      defaultValue={[0.3]}
                      max={1}
                      step={0.1}
                      onValueChange={(value) => handleSlider("topP", value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">
                      Top K <span className="ml-36"> {sliderValues.topK}</span>
                    </Label>
                    <Slider
                      defaultValue={[1]}
                      min={1}
                      max={2}
                      step={0.1}
                      onValueChange={(value) => handleSlider("topK", value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">
                      Max Length{" "}
                      <span className="ml-24"> {sliderValues.maxLength}</span>
                    </Label>
                    <Slider
                      defaultValue={[500]}
                      max={4095}
                      min={100}
                      step={1}
                      onValueChange={(value) =>
                        handleSlider("maxLength", value)
                      }
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">
                      Frequency penalty{" "}
                      <span className="ml-16">
                        {" "}
                        {sliderValues.frequencyPenalty}
                      </span>
                    </Label>
                    <Slider
                      defaultValue={[0.3]}
                      max={2}
                      step={0.1}
                      onValueChange={(value) =>
                        handleSlider("frequencyPenalty", value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">
                      Presence penalty{" "}
                      <span className="ml-16">
                        {" "}
                        {sliderValues.presencePenalty}
                      </span>
                    </Label>
                    <Slider
                      defaultValue={[0.3]}
                      max={2}
                      step={0.1}
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
            
              {output.map((item, index) => (
                <ScrollArea
                  key={index}
                  className="h-[200px] w-[350px] rounded-md border p-4"
                >
                  <p className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                    {selectedmodelsfinal[index]}
                  </p>

                  <p className="leading-7">{item}</p>
                </ScrollArea>
              ))}
            </div>

            <div className="flex-1" />
            <div
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
                {loader ?  <Button
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5"
                  onClick={handleRequest}
                >
                  loading ...
                  <CornerDownLeft className="size-3.5" />
                </Button> :<Button
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5"
                  onClick={handleRequest}
                >
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>}
               
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
