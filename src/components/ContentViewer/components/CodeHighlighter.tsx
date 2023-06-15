import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import codeStyle from "react-syntax-highlighter/dist/esm/styles/hljs/lioshi";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);

interface ICodeHighlighterProps {
  children: string;
  language?: string;
}

export const CodeHighlighter = ({
  children,
  language = "javascript",
}: ICodeHighlighterProps): JSX.Element => {
  return (
    <SyntaxHighlighter
      style={codeStyle}
      language={language}
      showLineNumbers
      wrapLines
    >
      {children}
    </SyntaxHighlighter>
  );
};
