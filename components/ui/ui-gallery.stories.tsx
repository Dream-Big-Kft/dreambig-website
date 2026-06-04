"use client"

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  AlertCircle,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  FileText,
  Mail,
  MoreHorizontal,
  Search,
  Settings,
  Sparkles,
} from "lucide-react"
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const meta = {
  title: "UI/Component Gallery",
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj

const chartData = [
  { month: "Jan", leads: 24 },
  { month: "Feb", leads: 38 },
  { month: "Mar", leads: 31 },
  { month: "Apr", leads: 48 },
  { month: "May", leads: 42 },
]

const chartConfig = {
  leads: {
    label: "Leads",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

function StoryShell({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full max-w-5xl gap-6">{children}</div>
}

function ComponentRow({
  name,
  exports,
  children,
}: {
  name: string
  exports: string
  children?: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="gap-1">
        <CardTitle className="font-mono text-base">{name}</CardTitle>
        <CardDescription className="font-mono text-xs">
          {exports}
        </CardDescription>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
    </Card>
  )
}

function CatalogSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2">{children}</div>
    </section>
  )
}

export const Inventory: Story = {
  render: () => (
    <TooltipProvider>
      <StoryShell>
        <CatalogSection title="Actions">
          <ComponentRow name="button.tsx" exports="Button, buttonVariants">
            <div className="flex flex-wrap gap-2">
              <Button>Button</Button>
              <Button variant="outline">Outline</Button>
              <Button size="icon" aria-label="Settings">
                <Settings />
              </Button>
            </div>
          </ComponentRow>
          <ComponentRow
            name="button-group.tsx"
            exports="ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants"
          >
            <ButtonGroup>
              <Button variant="outline">One</Button>
              <Button variant="outline">Two</Button>
              <ButtonGroupSeparator />
              <ButtonGroupText>Text</ButtonGroupText>
            </ButtonGroup>
          </ComponentRow>
          <ComponentRow name="toggle.tsx" exports="Toggle, toggleVariants">
            <Toggle aria-label="Toggle preview">Toggle</Toggle>
          </ComponentRow>
          <ComponentRow
            name="toggle-group.tsx"
            exports="ToggleGroup, ToggleGroupItem"
          >
            <ToggleGroup type="single">
              <ToggleGroupItem value="a">A</ToggleGroupItem>
              <ToggleGroupItem value="b">B</ToggleGroupItem>
            </ToggleGroup>
          </ComponentRow>
        </CatalogSection>

        <CatalogSection title="Forms">
          <ComponentRow name="input.tsx" exports="Input">
            <Input placeholder="Input" />
          </ComponentRow>
          <ComponentRow name="textarea.tsx" exports="Textarea">
            <Textarea placeholder="Textarea" />
          </ComponentRow>
          <ComponentRow name="label.tsx" exports="Label">
            <Label>Label</Label>
          </ComponentRow>
          <ComponentRow
            name="input-group.tsx"
            exports="InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea"
          >
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="InputGroup" />
            </InputGroup>
          </ComponentRow>
          <ComponentRow
            name="field.tsx"
            exports="FieldSet, FieldLegend, FieldGroup, Field, FieldContent, FieldLabel, FieldTitle, FieldDescription, FieldSeparator, FieldError"
          >
            <Field>
              <FieldLabel>FieldLabel</FieldLabel>
              <Input placeholder="Field input" />
              <FieldDescription>FieldDescription</FieldDescription>
            </Field>
          </ComponentRow>
          <ComponentRow
            name="form.tsx"
            exports="Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField"
          >
            <span className="text-muted-foreground text-sm">
              react-hook-form wrappers
            </span>
          </ComponentRow>
          <ComponentRow name="checkbox.tsx" exports="Checkbox">
            <div className="flex items-center gap-2">
              <Checkbox id="inventory-checkbox" defaultChecked />
              <Label htmlFor="inventory-checkbox">Checkbox</Label>
            </div>
          </ComponentRow>
          <ComponentRow
            name="radio-group.tsx"
            exports="RadioGroup, RadioGroupItem"
          >
            <RadioGroup defaultValue="one">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="one" id="inventory-radio" />
                <Label htmlFor="inventory-radio">RadioGroupItem</Label>
              </div>
            </RadioGroup>
          </ComponentRow>
          <ComponentRow name="switch.tsx" exports="Switch">
            <Switch defaultChecked />
          </ComponentRow>
          <ComponentRow name="slider.tsx" exports="Slider">
            <Slider defaultValue={[50]} />
          </ComponentRow>
          <ComponentRow
            name="select.tsx"
            exports="Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton"
          >
            <Select defaultValue="one">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one">SelectItem</SelectItem>
              </SelectContent>
            </Select>
          </ComponentRow>
          <ComponentRow
            name="input-otp.tsx"
            exports="InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator"
          >
            <InputOTP maxLength={3} defaultValue="123">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
            </InputOTP>
          </ComponentRow>
          <ComponentRow name="calendar.tsx" exports="Calendar, CalendarDayButton">
            <Calendar mode="single" selected={new Date(2026, 5, 4)} />
          </ComponentRow>
        </CatalogSection>

        <CatalogSection title="Content And Data">
          <ComponentRow
            name="card.tsx"
            exports="Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent"
          >
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>CardDescription</CardDescription>
              </CardHeader>
            </Card>
          </ComponentRow>
          <ComponentRow name="badge.tsx" exports="Badge, badgeVariants">
            <div className="flex gap-2">
              <Badge>Badge</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </ComponentRow>
          <ComponentRow
            name="table.tsx"
            exports="Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TableHead</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>TableCell</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ComponentRow>
          <ComponentRow
            name="chart.tsx"
            exports="ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle"
          >
            <ChartContainer config={chartConfig} className="h-32">
              <LineChart data={chartData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <Line dataKey="leads" stroke="var(--color-leads)" dot={false} />
              </LineChart>
            </ChartContainer>
          </ComponentRow>
          <ComponentRow name="progress.tsx" exports="Progress">
            <Progress value={66} />
          </ComponentRow>
          <ComponentRow name="skeleton.tsx" exports="Skeleton">
            <Skeleton className="h-10 w-48" />
          </ComponentRow>
          <ComponentRow name="avatar.tsx" exports="Avatar, AvatarImage, AvatarFallback">
            <Avatar>
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </ComponentRow>
          <ComponentRow name="aspect-ratio.tsx" exports="AspectRatio">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
              <div className="flex size-full items-center justify-center text-sm">
                AspectRatio
              </div>
            </AspectRatio>
          </ComponentRow>
        </CatalogSection>

        <CatalogSection title="Navigation And Disclosure">
          <ComponentRow
            name="accordion.tsx"
            exports="Accordion, AccordionItem, AccordionTrigger, AccordionContent"
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="one">
                <AccordionTrigger>AccordionTrigger</AccordionTrigger>
                <AccordionContent>AccordionContent</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentRow>
          <ComponentRow
            name="tabs.tsx"
            exports="Tabs, TabsList, TabsTrigger, TabsContent"
          >
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTrigger value="one">TabsTrigger</TabsTrigger>
              </TabsList>
              <TabsContent value="one">TabsContent</TabsContent>
            </Tabs>
          </ComponentRow>
          <ComponentRow
            name="collapsible.tsx"
            exports="Collapsible, CollapsibleTrigger, CollapsibleContent"
          >
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <Button variant="outline">CollapsibleTrigger</Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-sm">
                CollapsibleContent
              </CollapsibleContent>
            </Collapsible>
          </ComponentRow>
          <ComponentRow
            name="breadcrumb.tsx"
            exports="Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis"
          >
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">BreadcrumbLink</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>BreadcrumbPage</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ComponentRow>
          <ComponentRow
            name="navigation-menu.tsx"
            exports="NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle"
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">NavigationMenuLink</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ComponentRow>
          <ComponentRow
            name="pagination.tsx"
            exports="Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis"
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentRow>
          <ComponentRow
            name="menubar.tsx"
            exports="Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal, MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut"
          >
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>MenubarTrigger</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>MenubarItem</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </ComponentRow>
          <ComponentRow
            name="command.tsx"
            exports="Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator"
          >
            <Command className="border">
              <CommandInput placeholder="CommandInput" />
              <CommandList>
                <CommandEmpty>CommandEmpty</CommandEmpty>
                <CommandGroup heading="CommandGroup">
                  <CommandItem>CommandItem</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ComponentRow>
        </CatalogSection>

        <CatalogSection title="Overlays">
          <ComponentRow
            name="dialog.tsx"
            exports="Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button>DialogTrigger</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>DialogTitle</DialogTitle>
                  <DialogDescription>DialogDescription</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </ComponentRow>
          <ComponentRow
            name="alert-dialog.tsx"
            exports="AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger"
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">AlertDialogTrigger</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>AlertDialogTitle</AlertDialogTitle>
                  <AlertDialogDescription>AlertDialogDescription</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Action</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ComponentRow>
          <ComponentRow
            name="sheet.tsx"
            exports="Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger"
          >
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">SheetTrigger</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>SheetTitle</SheetTitle>
                  <SheetDescription>SheetDescription</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </ComponentRow>
          <ComponentRow
            name="drawer.tsx"
            exports="Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription"
          >
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">DrawerTrigger</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>DrawerTitle</DrawerTitle>
                  <DrawerDescription>DrawerDescription</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </ComponentRow>
          <ComponentRow
            name="dropdown-menu.tsx"
            exports="DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">DropdownMenuTrigger</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>DropdownMenuItem</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ComponentRow>
          <ComponentRow
            name="context-menu.tsx"
            exports="ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup"
          >
            <ContextMenu>
              <ContextMenuTrigger className="border-border flex h-20 items-center justify-center rounded-md border text-sm">
                ContextMenuTrigger
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>ContextMenuItem</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </ComponentRow>
          <ComponentRow
            name="popover.tsx"
            exports="Popover, PopoverTrigger, PopoverContent, PopoverAnchor"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">PopoverTrigger</Button>
              </PopoverTrigger>
              <PopoverContent>PopoverContent</PopoverContent>
            </Popover>
          </ComponentRow>
          <ComponentRow
            name="hover-card.tsx"
            exports="HoverCard, HoverCardTrigger, HoverCardContent"
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">HoverCardTrigger</Button>
              </HoverCardTrigger>
              <HoverCardContent>HoverCardContent</HoverCardContent>
            </HoverCard>
          </ComponentRow>
          <ComponentRow
            name="tooltip.tsx"
            exports="Tooltip, TooltipTrigger, TooltipContent, TooltipProvider"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">TooltipTrigger</Button>
              </TooltipTrigger>
              <TooltipContent>TooltipContent</TooltipContent>
            </Tooltip>
          </ComponentRow>
        </CatalogSection>

        <CatalogSection title="Feedback And Layout">
          <ComponentRow name="alert.tsx" exports="Alert, AlertTitle, AlertDescription">
            <Alert>
              <AlertCircle />
              <AlertTitle>AlertTitle</AlertTitle>
              <AlertDescription>AlertDescription</AlertDescription>
            </Alert>
          </ComponentRow>
          <ComponentRow
            name="empty.tsx"
            exports="Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia"
          >
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Sparkles />
                </EmptyMedia>
                <EmptyTitle>EmptyTitle</EmptyTitle>
                <EmptyDescription>EmptyDescription</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </ComponentRow>
          <ComponentRow
            name="item.tsx"
            exports="Item, ItemMedia, ItemContent, ItemActions, ItemGroup, ItemSeparator, ItemTitle, ItemDescription, ItemHeader, ItemFooter"
          >
            <Item>
              <ItemMedia variant="icon">
                <FileText />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>ItemTitle</ItemTitle>
                <ItemDescription>ItemDescription</ItemDescription>
              </ItemContent>
            </Item>
          </ComponentRow>
          <ComponentRow
            name="carousel.tsx"
            exports="Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselApi"
          >
            <Carousel className="mx-auto w-64">
              <CarouselContent>
                <CarouselItem>
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                    <div className="flex size-full items-center justify-center">
                      CarouselItem
                    </div>
                  </AspectRatio>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </ComponentRow>
          <ComponentRow
            name="resizable.tsx"
            exports="ResizablePanelGroup, ResizablePanel, ResizableHandle"
          >
            <ResizablePanelGroup direction="horizontal" className="min-h-20 rounded-md border">
              <ResizablePanel defaultSize={50} className="p-3">Panel</ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50} className="p-3">Panel</ResizablePanel>
            </ResizablePanelGroup>
          </ComponentRow>
          <ComponentRow name="scroll-area.tsx" exports="ScrollArea, ScrollBar">
            <ScrollArea className="h-24 rounded-md border p-3">
              <div className="grid gap-2 text-sm">
                <span>ScrollArea</span>
                <span>ScrollArea</span>
                <span>ScrollArea</span>
                <span>ScrollArea</span>
              </div>
              <ScrollBar />
            </ScrollArea>
          </ComponentRow>
          <ComponentRow name="separator.tsx" exports="Separator">
            <Separator />
          </ComponentRow>
          <ComponentRow name="kbd.tsx" exports="Kbd, KbdGroup">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </ComponentRow>
          <ComponentRow name="spinner.tsx" exports="Spinner">
            <Spinner />
          </ComponentRow>
        </CatalogSection>

        <CatalogSection title="Application Shell And Notifications">
          <ComponentRow
            name="sidebar.tsx"
            exports="Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar"
          >
            <span className="text-muted-foreground text-sm">
              Application shell primitives
            </span>
          </ComponentRow>
          <ComponentRow
            name="toast.tsx"
            exports="Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, toastVariants, ToastProps, ToastActionElement"
          >
            <span className="text-muted-foreground text-sm">
              Radix toast primitives
            </span>
          </ComponentRow>
          <ComponentRow name="toaster.tsx" exports="Toaster">
            <span className="text-muted-foreground text-sm">
              Toast renderer connected to useToast
            </span>
          </ComponentRow>
          <ComponentRow name="sonner.tsx" exports="Toaster">
            <span className="text-muted-foreground text-sm">
              Sonner toast renderer
            </span>
          </ComponentRow>
          <ComponentRow name="use-mobile.tsx" exports="useIsMobile">
            <span className="text-muted-foreground text-sm">Hook, no visual UI</span>
          </ComponentRow>
          <ComponentRow name="use-toast.ts" exports="useToast, toast">
            <span className="text-muted-foreground text-sm">Hook/helper, no visual UI</span>
          </ComponentRow>
        </CatalogSection>
      </StoryShell>
    </TooltipProvider>
  ),
}

export const Actions: Story = {
  render: () => (
    <StoryShell>
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
        <Button size="icon" aria-label="Settings">
          <Settings />
        </Button>
      </div>
      <ButtonGroup>
        <Button variant="outline">Back</Button>
        <Button variant="outline">Forward</Button>
        <ButtonGroupSeparator />
        <ButtonGroupText>Grouped</ButtonGroupText>
      </ButtonGroup>
      <div className="flex flex-wrap gap-3">
        <Toggle aria-label="Toggle bold">Bold</Toggle>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </StoryShell>
  ),
}

export const Forms: Story = {
  render: () => (
    <StoryShell>
      <FieldSet>
        <FieldLegend>Contact details</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" placeholder="Dream Big Kft" />
            <FieldDescription>Shown on invoices and proposals.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput id="email" placeholder="hello@dreambig.hu" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>.hu</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea id="message" placeholder="Tell us about the project..." />
          </Field>
        </FieldGroup>
      </FieldSet>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-3">
          <Label>Plan</Label>
          <RadioGroup defaultValue="growth">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="starter" id="starter" />
              <Label htmlFor="starter">Starter</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="growth" id="growth" />
              <Label htmlFor="growth">Growth</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid gap-3">
          <Label>Preferences</Label>
          <div className="flex items-center gap-2">
            <Checkbox id="updates" defaultChecked />
            <Label htmlFor="updates">Send product updates</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="dark-mode" />
            <Label htmlFor="dark-mode">Dark mode</Label>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Select defaultValue="design">
          <SelectTrigger>
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Design system</SelectItem>
            <SelectItem value="web">Website</SelectItem>
            <SelectItem value="app">Application</SelectItem>
          </SelectContent>
        </Select>
        <Slider defaultValue={[62]} max={100} step={1} />
        <InputOTP maxLength={6} defaultValue="123456">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </StoryShell>
  ),
}

export const ContentAndData: Story = {
  render: () => (
    <StoryShell>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Project health</CardTitle>
            <CardDescription>Weekly delivery summary</CardDescription>
            <CardAction>
              <Badge>Live</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">92%</div>
            <Progress value={92} className="mt-4" />
          </CardContent>
          <CardFooter className="text-muted-foreground text-sm">
            Updated just now
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pipeline</CardTitle>
            <CardDescription>Simple chart container</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-44 w-full">
              <LineChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="leads"
                  type="monotone"
                  stroke="var(--color-leads)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Date picker styling</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={new Date(2026, 5, 4)} />
          </CardContent>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Forms</TableCell>
            <TableCell><Badge variant="secondary">Ready</Badge></TableCell>
            <TableCell className="text-right">12</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Overlays</TableCell>
            <TableCell><Badge variant="secondary">Ready</Badge></TableCell>
            <TableCell className="text-right">8</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StoryShell>
  ),
}

export const NavigationAndDisclosure: Story = {
  render: () => (
    <StoryShell>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>UI gallery</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New project</MenubarItem>
            <MenubarItem>Duplicate</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Archive</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Services</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Tabs defaultValue="accordion">
        <TabsList>
          <TabsTrigger value="accordion">Accordion</TabsTrigger>
          <TabsTrigger value="collapsible">Collapsible</TabsTrigger>
        </TabsList>
        <TabsContent value="accordion">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="one">
              <AccordionTrigger>What is in this branch?</AccordionTrigger>
              <AccordionContent>
                Root app from main plus the restored UI component library.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="collapsible">
          <Collapsible defaultOpen className="grid gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="outline">Toggle details</Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="text-muted-foreground text-sm">
              Collapsible content keeps advanced details tucked away.
            </CollapsibleContent>
          </Collapsible>
        </TabsContent>
      </Tabs>
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    </StoryShell>
  ),
}

export const Overlays: Story = {
  render: () => (
    <TooltipProvider>
      <StoryShell>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild><Button>Dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit project</DialogTitle>
                <DialogDescription>Update the project name and contact email.</DialogDescription>
              </DialogHeader>
              <Input defaultValue="Dream Big website" />
              <DialogFooter><Button>Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline">Alert dialog</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Archive this item?</AlertDialogTitle>
                <AlertDialogDescription>This can be restored later from the archive.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Archive</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline">Sheet</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>Panel for secondary controls.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Drawer>
            <DrawerTrigger asChild><Button variant="outline">Drawer</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Mobile action</DrawerTitle>
                <DrawerDescription>Drawer content appears from the edge.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Confirm</Button>
                <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Menu</Button></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy link</DropdownMenuItem>
              <DropdownMenuItem>Open settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="grid gap-2">
                <div className="font-medium">Quick note</div>
                <Textarea placeholder="Add internal context..." />
              </div>
            </PopoverContent>
          </Popover>
          <HoverCard>
            <HoverCardTrigger asChild><Button variant="link">Hover card</Button></HoverCardTrigger>
            <HoverCardContent>Useful for previewing a linked item.</HoverCardContent>
          </HoverCard>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Notifications"><Bell /></Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </div>
        <ContextMenu>
          <ContextMenuTrigger className="border-border bg-card text-card-foreground flex h-28 items-center justify-center rounded-md border text-sm">
            Right click this area
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Open</ContextMenuItem>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </StoryShell>
    </TooltipProvider>
  ),
}

export const FeedbackAndStatus: Story = {
  render: () => (
    <StoryShell>
      <Alert>
        <AlertCircle />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Storybook is now wired to the restored UI set.</AlertDescription>
      </Alert>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Spinner />
        <Skeleton className="h-9 w-40" />
        <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
      </div>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"><Sparkles /></EmptyMedia>
          <EmptyTitle>No components selected</EmptyTitle>
          <EmptyDescription>Use this gallery to inspect available UI patterns.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent><Button>Select component</Button></EmptyContent>
      </Empty>
    </StoryShell>
  ),
}

export const RichLayouts: Story = {
  render: () => (
    <StoryShell>
      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        <Card>
          <CardContent className="p-0">
            <ItemGroup>
              <Item>
                <ItemMedia variant="icon"><FileText /></ItemMedia>
                <ItemContent>
                  <ItemTitle>Proposal</ItemTitle>
                  <ItemDescription>Ready for review</ItemDescription>
                </ItemContent>
                <ItemActions><Button size="icon" variant="ghost"><MoreHorizontal /></Button></ItemActions>
              </Item>
              <ItemSeparator />
              <Item>
                <ItemMedia variant="icon"><CreditCard /></ItemMedia>
                <ItemContent>
                  <ItemTitle>Invoice</ItemTitle>
                  <ItemDescription>Payment scheduled</ItemDescription>
                </ItemContent>
                <ItemActions><Check className="size-4" /></ItemActions>
              </Item>
            </ItemGroup>
          </CardContent>
        </Card>
        <ResizablePanelGroup direction="horizontal" className="min-h-48 rounded-md border">
          <ResizablePanel defaultSize={35} className="p-4">
            <div className="font-medium">Sidebar</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={65} className="p-4">
            <ScrollArea className="h-36">
              <div className="grid gap-3 pr-4 text-sm">
                {Array.from({ length: 8 }).map((_, index) => (
                  <p key={index}>Scrollable content row {index + 1}</p>
                ))}
              </div>
              <ScrollBar />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Carousel className="mx-auto w-full max-w-xl">
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={item}>
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                <div className="flex size-full items-center justify-center text-2xl font-semibold">
                  Slide {item}
                </div>
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Command className="border shadow-sm">
        <CommandInput placeholder="Search components..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem><Search /> Search <CommandShortcut>⌘K</CommandShortcut></CommandItem>
            <CommandItem><CalendarDays /> Calendar</CommandItem>
            <CommandItem><ChevronRight /> Navigation</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex items-center gap-3">
        <Avatar><AvatarFallback>DB</AvatarFallback></Avatar>
        <Separator orientation="vertical" className="h-8" />
        <span className="text-muted-foreground text-sm">Avatar and separator primitives</span>
      </div>
    </StoryShell>
  ),
}
