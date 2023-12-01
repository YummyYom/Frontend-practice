import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

interface ContainerProp {
  name: string;
  id?: string;
  className?: string;
  isWindowHeader?: boolean;
  contentDisplay?: string;
  flexDirection?: string;
  padding?: string;
  height?: string;
  overflowY?: string;
}

export const enum ContainerType {
  ContainerBlock = 'ContainerBlock',
  ScreenContainer = 'ScreenContainer',
}

function ContainerBlock(props: React.PropsWithChildren<ContainerProp>) {
  return (
    <Box className={[ContainerType.ContainerBlock, props.className as ContainerType].join(' ')} id={props.name}>
      <Box
        bgGradient={'linear(to-r, gray.500, gray.300)'}
        color={'white'}
        paddingLeft={'0.3em'}
        display={'grid'}
        fontWeight={'bold'}
        fontSize={'0.8em'}
        className="ContainerHeader"
      >
        <Box>{props.name}</Box>
      </Box>
      {props.contentDisplay === 'flex' ? (
        <Flex
          className="ContainerContent"
          padding="0.2em"
          minWidth="max-content"
          alignItems="center"
          direction={props.flexDirection as 'column' | 'row' | 'column-reverse' | 'row-reverse'}
          height={props.height}
          overflowY={props.overflowY as 'auto' | 'scroll' | undefined}
        >
          {props.children}
        </Flex>
      ) : (
        <Box
          className="ContainerContent"
          padding="0.2em"
          height={props.height}
          overflowY={props.overflowY as 'auto' | 'scroll' | undefined}
        >
          {props.children}
        </Box>
      )}
    </Box>
  );
}
export default ContainerBlock;
