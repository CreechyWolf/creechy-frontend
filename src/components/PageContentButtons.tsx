import PageContent from "./PageContent";
import ButtonList from "./ButtonList";

interface PageContentButtonsProps {
  children: React.ReactNode;
}

function PageContentButtons({ children }: PageContentButtonsProps) {
  return (
    <PageContent>
      <ButtonList>{children}</ButtonList>
    </PageContent>
  );
}

export default PageContentButtons;
