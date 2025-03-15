import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef(function DropdownMenuSubTrigger(
    { className, inset, children, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.SubTrigger
            ref={ref}
            className={cn(
                "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
                inset && "pl-8",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </DropdownMenuPrimitive.SubTrigger>
    );
});

const DropdownMenuSubContent = React.forwardRef(function DropdownMenuSubContent(
    { className, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.SubContent
            ref={ref}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
                className
            )}
            {...props}
        />
    );
});

const DropdownMenuContent = React.forwardRef(function DropdownMenuContent(
    { className, sideOffset = 4, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    );
});

const DropdownMenuItem = React.forwardRef(function DropdownMenuItem(
    { className, inset, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.Item
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
                inset && "pl-8",
                className
            )}
            {...props}
        />
    );
});

const DropdownMenuCheckboxItem = React.forwardRef(function DropdownMenuCheckboxItem(
    { className, children, checked, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            ref={ref}
            className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none", className)}
            checked={checked}
            {...props}
        >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
});

const DropdownMenuRadioItem = React.forwardRef(function DropdownMenuRadioItem(
    { className, children, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.RadioItem
            ref={ref}
            className={cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none", className)}
            {...props}
        >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    );
});

const DropdownMenuLabel = React.forwardRef(function DropdownMenuLabel(
    { className, inset, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.Label
            ref={ref}
            className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
            {...props}
        />
    );
});

const DropdownMenuSeparator = React.forwardRef(function DropdownMenuSeparator(
    { className, ...props },
    ref
) {
    return (
        <DropdownMenuPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-muted", className)}
            {...props}
        />
    );
});

const DropdownMenuShortcut = function DropdownMenuShortcut({ className, ...props }) {
    return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
};