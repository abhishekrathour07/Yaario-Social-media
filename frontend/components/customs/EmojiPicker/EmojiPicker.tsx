import React from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Smile } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface EmojiPickerProps {
    onEmojiSelect: (emoji: any) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Smile className="h-6 w-6 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 border-none">
                <div className="h-[250px] overflow-hidden">
                    <Picker
                        theme="dark"
                        previewPosition="none"
                        skinTonePosition="none"
                        perLine={8}
                        data={data}
                        onEmojiSelect={onEmojiSelect}
                        noFrequentlyUsed={true}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default EmojiPicker;
