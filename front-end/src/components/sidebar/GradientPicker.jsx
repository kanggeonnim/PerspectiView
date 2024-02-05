'use client'

import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Paintbrush } from 'lucide-react'
// import Link from 'next/link'

// export function PickerExample() {
//   const [background, setBackground] = useState('#B4D455')

//   return (
//     <div
//       className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
//       style={{ background }}
//     >
//       <GradientPicker background={background} setBackground={setBackground} />
//     </div>
//   )
// }

export function GradientPicker({
  background,
  setBackground,
  className,
}) {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
    '#D1180B'
  ]

  return (
    <Popover>
      <PopoverTrigger onClick={e => (e.stopPropagation())} asChild>
        {/* <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        > */}
          <div className="flex items-center mx-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="w-4 h-4" />
            )
            }
            
            {/* <div className="flex-1 truncate">
              {background ? background : 'Pick a color'}
            </div> */}
          </div>
        {/* </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-32 h-32 p-1 border border-blue-500">
        <Tabs defaultValue='solid' className="w-full border border-red-500">
          {/* <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
          </TabsList> */}

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="w-6 h-6 rounded-md cursor-pointer active:scale-105"
                onClick={(e) => {
                  setBackground(s);
                  e.stopPropagation();
                }}
                // onClick={() => setBackground(s)}
                // onClick={e => (e.stopPropagation())}
              />
            ))}
          </TabsContent>

       
          {/* <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="h-8 col-span-2 my-1 border border-orange-500"
          onChange={(e) => setBackground(e.currentTarget.value)}
          onClick={e => (e.stopPropagation())}
        />
      </PopoverContent>
    </Popover>
  )
}

// const GradientButton = ({
//   background,
//   children,
// }) => {
//   return (
//     <div
//       className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
//       style={{ background }}
//     >
//       <div className="p-1 text-xs text-center rounded-md bg-popover/80">
//         {children}
//       </div>
//     </div>
//   )
// }