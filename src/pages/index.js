import React, { useState, useEffect } from 'react'
import { Box, Heading, Button, Stack, Text } from '@chakra-ui/core'
import { API } from 'aws-amplify'

const initialState = { votesNo: 0, votesYes: 0 }

export default function IndexPage() {
  const [votes, setVotes] = useState(initialState)

  useEffect(() => {
    fetchVotes()
  }, [])

  return (
    <Box m="auto" maxW={960} textAlign="center">
      <Heading as="h1">
        Welcome to the Serverless Voting App. Now with Amplify!
      </Heading>
      <Heading as="h4">Click to vote on this very important issue.</Heading>
      <Heading as="h4">
        You can vote as many times as you like. Click away!
      </Heading>

      <Stack direction="row" justify="center" mt={20} spacing={10}>
        <Box>
          <Text color="green" mb={5} fontSize="xl">
            {votes.votesYes}
          </Text>
          <Button
            variantColor="green"
            size="lg"
            onClick={() => updateVotes('yes')}
          >
            Yes
          </Button>
        </Box>
        <Box>
          <Text color="red" mb={5} fontSize="xl">
            {votes.votesNo}
          </Text>
          <Button
            variantColor="red"
            size="lg"
            onClick={() => updateVotes('no')}
          >
            No
          </Button>
        </Box>
      </Stack>
    </Box>
  )

  // ##########################################################
  async function updateVotes(vote) {
    try {
      const response = await API.post('pollCounterAPI', '/votes', {
        queryStringParameters: { vote },
      })
      setVotes({ ...votes, ...response.data.Attributes })
    } catch (err) {
      console.error('error updating votes: ', err)
    }
  }

  async function fetchVotes() {
    try {
      const response = await API.get('pollCounterAPI', '/votes/poll-001')
      setVotes({ ...response[0] })
    } catch (err) {
      console.error('error fetching votes: ', err)
    }
  }
}
