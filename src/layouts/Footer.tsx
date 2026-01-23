interface FooterElementProps {
  text: string
  link: string
}

function FooterElement(props: Readonly<FooterElementProps>) {
  return (
    <a className="pl-4" href={props.link} target="_black">
      <p className="text-gray-100 font-bold hover:text-purple-300">
        {props.text}
      </p>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="flex justify-center items-center bg-gray-700 p-4">
      <FooterElement link="https://github.com/elmanueh" text="Github" />
      <FooterElement
        link="https://www.linkedin.com/in/manuel-bernabe-rodriguez/"
        text="LinkedIn"
      />
    </footer>
  )
}
