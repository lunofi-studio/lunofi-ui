// `sheet` is an alias of `drawer`. Base UI backs both with the Dialog primitive
// and side variants; this file re-exports the drawer surface under the
// shadcn-familiar `Sheet*` names so consumers can import either path.
export {
  Drawer as Sheet,
  DrawerClose as SheetClose,
  DrawerContent as SheetContent,
  DrawerDescription as SheetDescription,
  DrawerFooter as SheetFooter,
  DrawerHeader as SheetHeader,
  DrawerPortal as SheetPortal,
  DrawerTitle as SheetTitle,
  DrawerTrigger as SheetTrigger,
  drawerVariants as sheetVariants,
} from '@lunofi/ui/drawer';
