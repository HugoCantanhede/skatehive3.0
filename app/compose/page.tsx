'use client'
import { useAioha } from '@aioha/react-ui'
import { Flex, Input, Tag, TagCloseButton, TagLabel, Wrap, WrapItem, Button } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const Editor = dynamic(() => import('./Editor'), { ssr: false })

export default function Composer() {
  const [markdown, setMarkdown] = useState("")
  const [title, setTitle] = useState("")
  const [hashtagInput, setHashtagInput] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])

  const { aioha } = useAioha()
  const communityTag = process.env.NEXT_PUBLIC_HIVE_COMMUNITY_TAG || 'blog'

  const handleHashtagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    if (key === " " && hashtagInput.trim()) { // If space is pressed and input is not empty
      setHashtags([...hashtags, hashtagInput.trim()])
      setHashtagInput("") // Clear input field
    } else if (key === "Backspace" && !hashtagInput && hashtags.length) {
      // Remove the last tag if backspace is hit and input is empty
      setHashtags(hashtags.slice(0, -1))
    }
  }

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    const permlink = title.replaceAll(" ", "-")
    await aioha.comment(null, communityTag, permlink, title, markdown, { tags: hashtags, app: 'Skatehive App 3.0' });
  }

  return (
    <Flex
      width="100%"
      height="100vh" // Ensure the entire screen height is used
      bgColor="background"
      justify="center"
      p="1"
      direction="column"
      overflow="hidden"
    >
      <Input
        placeholder="Enter post title"
        mb="4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="lg"
        borderRadius="base"
      />

      {/* Editor */}
      <Flex
        flex="1" // Take up remaining space
        border="1px solid"
        borderColor="black"
        borderRadius="base"
        justify="center"
        p="1"
        overflow="hidden" // Prevent internal scrolling of the parent container
      >
        <Flex
          width="100%"
          height="100%" // Ensure the editor fills the container
          overflow="auto" // Enable scrolling inside the editor
        >
          <Editor markdown={markdown} setMarkdown={setMarkdown} />
        </Flex>
      </Flex>

      {/* Hashtag Input */}
      <Input
        placeholder="Enter hashtags"
        mt="4"
        value={hashtagInput}
        onChange={(e) => setHashtagInput(e.target.value)}
        onKeyDown={handleHashtagKeyDown}
        borderRadius="base"
      />
      {/* Display Hashtags as Tags */}
      <Wrap mt="2">
        {hashtags.map((tag, index) => (
          <WrapItem key={index}>
            <Tag
              size="md"
              borderRadius="base"
              variant="solid"
              colorScheme="blue"
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeHashtag(index)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
      <Flex mt="1" justify="flex-end">
        <Button
          size="sm" // Make button smaller
          colorScheme="blue"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  )
}
