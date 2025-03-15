import React from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "../../lib/utils";
import { DialogContent } from "../ui/dialog";

const Command = React.forwardRef(function Command({ className, ...props }, ref) {
    return (
        <CommandPrimitive
            ref={ref}
            className={cn(
                "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
                className
            )}
            {...props}
        />
    );
});

const CommandDialog = ({ children, ...props }) => {
    return (
        <Dialog {...props}>
            <DialogContent className="overflow-hidden p-0 shadow-lg">
                <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    );
};

const CommandInput = React.forwardRef(function CommandInput({ className, ...props }, ref) {
    return (
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
                ref={ref}
                className={cn(
                    "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        </div>
    );
});

const CommandList = React.forwardRef(function CommandList({ className, ...props }, ref) {
    return (
        <CommandPrimitive.List
            ref={ref}
            className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
            {...props}
        />
    );
});

const CommandEmpty = React.forwardRef(function CommandEmpty(props, ref) {
    return (
        <CommandPrimitive.Empty
            ref={ref}
            className="py-6 text-center text-sm"
            {...props}
        />
    );
});

const CommandGroup = React.forwardRef(function CommandGroup({ className, ...props }, ref) {
    return (
        <CommandPrimitive.Group
            ref={ref}
            className={cn(
                "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
                className
            )}
            {...props}
        />
    );
});

const CommandSeparator = React.forwardRef(function CommandSeparator({ className, ...props }, ref) {
    return (
        <CommandPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 h-px bg-border", className)}
            {...props}
        />
    );
});

const CommandItem = React.forwardRef(function CommandItem({ className, ...props }, ref) {
    return (
        <CommandPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
                className
            )}
            {...props}
        />
    );
});

const CommandShortcut = ({ className, ...props }) => {
    return (
        <span
            className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
            {...props}
        />
    );
};

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
