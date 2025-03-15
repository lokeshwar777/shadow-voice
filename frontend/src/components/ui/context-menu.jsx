import React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef(function ContextMenuSubTrigger(
    { className, inset, children, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.SubTrigger
            ref={ref}
            className={cn(
                "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                inset && "pl-8",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto h-4 w-4" />
        </ContextMenuPrimitive.SubTrigger>
    );
});

const ContextMenuSubContent = React.forwardRef(function ContextMenuSubContent(
    { className, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.SubContent
            ref={ref}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                className
            )}
            {...props}
        />
    );
});

const ContextMenuContent = React.forwardRef(function ContextMenuContent(
    { className, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                ref={ref}
                className={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                    className
                )}
                {...props}
            />
        </ContextMenuPrimitive.Portal>
    );
});

const ContextMenuItem = React.forwardRef(function ContextMenuItem(
    { className, inset, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.Item
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

const ContextMenuCheckboxItem = React.forwardRef(function ContextMenuCheckboxItem(
    { className, children, checked, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.CheckboxItem
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
                className
            )}
            checked={checked}
            {...props}
        >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </ContextMenuPrimitive.CheckboxItem>
    );
});

const ContextMenuRadioItem = React.forwardRef(function ContextMenuRadioItem(
    { className, children, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.RadioItem
            ref={ref}
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
                className
            )}
            {...props}
        >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </ContextMenuPrimitive.RadioItem>
    );
});

const ContextMenuLabel = React.forwardRef(function ContextMenuLabel(
    { className, inset, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.Label
            ref={ref}
            className={cn(
                "px-2 py-1.5 text-sm font-semibold text-foreground",
                inset && "pl-8",
                className
            )}
            {...props}
        />
    );
});

const ContextMenuSeparator = React.forwardRef(function ContextMenuSeparator(
    { className, ...props },
    ref
) {
    return (
        <ContextMenuPrimitive.Separator
            ref={ref}
            className={cn("-mx-1 my-1 h-px bg-border", className)}
            {...props}
        />
    );
});

const ContextMenuShortcut = function ContextMenuShortcut({ className, ...props }) {
    return (
        <span
            className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
            {...props}
        />
    );
};

export {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuGroup,
    ContextMenuPortal,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuRadioGroup,
};
