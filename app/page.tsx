"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function Home() {
  enum Appearance {
    System = "system",
    Light = "light",
    Dark = "dark",
  }

  const [url, setUrl] = React.useState("");
  const [appearance, setAppearance] = React.useState(Appearance.System);

  function getButtonMarkup(url: string, appearance: Appearance) {
    if (appearance === Appearance.System) {
      return `<a href=${url}>
          <picture>
              <source media="(prefers-color-scheme: dark)" srcset="https://installinraycast.celsiusnarhwal.dev/dark.svg"/>
              <source media="(prefers-color-scheme: light)" srcset="https://installinraycast.celsiusnarhwal.dev/light.svg"/>
              <img alt="Install in Raycast" src="https://installinraycast.celsiusnarhwal.dev/light.svg"/>
          </picture>
          </a>`;
    } else {
      return `[![Install in Raycast](https://installinraycast.celsiusnarhwal.dev/${appearance}.svg)](${url})`;
    }
  }

  async function copyRaycastButton(url: string, appearance: Appearance) {
    await window.navigator.clipboard.writeText(
      getButtonMarkup(url, appearance)
    );

    const button = document.getElementById("copyButton");
    button!.innerHTML = "Copied!";
    setTimeout(() => {
      button!.innerHTML = "Copy Markdown";
    }, 1500);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-black">
      <div className="z-10 text-sm">
        <Card className="min-w-[500px] max-w-5xl w-auto bg-white dark:bg-black">
          <CardHeader>
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="https://installinraycast.celsiusnarhwal.dev/dark.svg"
              />
              <source
                media="(prefers-color-scheme: light)"
                srcSet="https://installinraycast.celsiusnarhwal.dev/light.svg"
              />
              <img
                alt="Install in Raycast"
                src="https://installinraycast.celsiusnarhwal.dev/light.svg"
              />
            </picture>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="url">Raycast Store URL</Label>
                  <Input
                    className={"bg-white dark:bg-black"}
                    id="url"
                    placeholder="https://raycast.com/celsiusnarhwal/command-prompt"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="apperance">Appearance</Label>
                  <Select
                    value={appearance}
                    onValueChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setAppearance(e.target.value as Appearance)
                    }
                  >
                    <SelectTrigger
                      className={"bg-white dark:bg-black"}
                      id="apperance"
                    >
                      <SelectValue placeholder="System" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className={"bg-white dark:bg-black"}
                    >
                      <SelectItem
                        value={Appearance.System}
                        onClick={() => setAppearance(Appearance.System)}
                      >
                        System
                      </SelectItem>
                      <SelectItem
                        value={Appearance.Light}
                        onClick={() => setAppearance(Appearance.Light)}
                      >
                        Light
                      </SelectItem>
                      <SelectItem
                        value="dark"
                        onClick={() => setAppearance(Appearance.Dark)}
                      >
                        Dark
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              id={"copyButton"}
              onClick={() => copyRaycastButton(url, appearance)}
              disabled={!url}
            >
              Copy Markup
            </Button>
          </CardFooter>
        </Card>
      </div>
      <footer
        className={"fixed bottom-4 left-0 right-0 text-center text-gray-500"}
      >
        <div className={"pb-5"}>
          <a href={"https://celsiusnarhwal.dev"}>
            <Button
              className={
                "border border-black dark:border-white bg-background text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
              }
            >
              <Image
                src={"/celsius.svg"}
                alt={"celsius narhwal"}
                height={40}
                width={40}
                className={"pr-2"}
              />
              celsiusnarhwal.dev{" "}
              <i className="fa-solid fa-arrow-up-right-from-square pl-2"></i>
            </Button>
          </a>
        </div>
        Copyright © {new Date().getFullYear()}{" "}
        <a
          href="https://celsiusnarhwal.dev"
          className={
            "hover:text-black dark:hover:text-white transition duration-200"
          }
        >
          celsius narhwal
        </a>
        . Thank you kindly for your attention.
        <br />
        This project is not affiliated with or endorsed by Raycast.
        <br />
        "Raycast" and the Raycast logo are trademarks of Raycast Technologies
        Ltd.
      </footer>
    </main>
  );
}
