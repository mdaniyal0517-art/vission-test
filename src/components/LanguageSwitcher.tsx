import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <Label htmlFor="language-select" className="text-gray-700 dark:text-gray-300">
        {t('language_selector_label')}
      </Label>
      <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
        <SelectTrigger id="language-select" className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="ur">اردو</SelectItem> {/* Added Urdu option */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;