import { FC, useCallback, useEffect, useRef } from "react";
import {
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { debounce } from "../../helpers";

interface Props {
  isLoading?: boolean;
  setSearch: (search: string) => void;
}

const MotionInput = motion(Input);

export const Search: FC<Props> = (props) => {
  const { isLoading, setSearch } = props;

  const inputControls = useAnimation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "k") {
      event.preventDefault();
      searchInputRef.current?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      searchInputRef.current?.blur();
    } else if (event.metaKey && event.key === "Backspace") {
      event.preventDefault();
      searchInputRef.current!.value = "";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleFocus = () => {
    inputControls.start({ width: 200 });
  };

  const handleBlur = () => {
    inputControls.start({ width: 100 });
  };

  const handleInputChange = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 300),
    [setSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value);
  };

  const bgColor = useColorModeValue("accentWhite.200", "primaryDark.300");
  const borderColor = useColorModeValue("accentWhite.400", "accentDark.400");
  const textColor = useColorModeValue(
    "textColorWhite.200",
    "textColorDark.400"
  );
  const placeholderColor = useColorModeValue("white", "gray.400");

  return (
    <InputGroup size={"sm"}>
      <MotionInput
        ref={searchInputRef}
        layoutId={"input"}
        placeholder={"Search"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        animate={inputControls}
        variant={"search"}
        color={textColor}
        _placeholder={{ color: placeholderColor }}
        _focus={{ borderColor: borderColor }}
        borderColor={borderColor}
        onChange={handleChange}
      />
      <InputRightElement bg={bgColor} borderRadius={"md"} height={"30px"}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Icon fontSize={"16px"} as={IoSearchOutline} />
        )}
      </InputRightElement>
    </InputGroup>
  );
};
