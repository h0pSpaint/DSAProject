import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const DataStructureConfiguration = () => {
  // State for stack configuration and operations
  const [stackSize, setStackSize] = useState(0);
  const [stackArray, setStackArray] = useState([]);
  const [topIndex, setTopIndex] = useState(-1);
  const [currentValue, setCurrentValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // State for queue configuration and operations
  const [queueSize, setQueueSize] = useState(0);
  const [queueArray, setQueueArray] = useState([]);
  const [frontIndex, setFrontIndex] = useState(-1);
  const [rearIndex, setRearIndex] = useState(-1);

  // Main menu state
  const [mainMenu, setMainMenu] = useState(true);
  const [stackMenu, setStackMenu] = useState(false);
  const [queueMenu, setQueueMenu] = useState(false);

  // Set stack size
  const handleSetStackSize = () => {
    if (stackSize <= 0) {
      setMessage('Please enter a valid stack size');
      setMessageType('error');
      return;
    }
    
    setStackArray(new Array(stackSize).fill(null));
    setMainMenu(false);
    setStackMenu(true);
    setMessage(`Stack of size ${stackSize} created successfully`);
    setMessageType('success');
  };

  // Set queue size
  const handleSetQueueSize = () => {
    if (queueSize <= 0) {
      setMessage('Please enter a valid queue size');
      setMessageType('error');
      return;
    }
    
    setQueueArray(new Array(queueSize).fill(null));
    setMainMenu(false);
    setQueueMenu(true);
    setMessage(`Queue of size ${queueSize} created successfully`);
    setMessageType('success');
  };

  // Stack operations
  const push = () => {
    if (topIndex === stackSize - 1) {
      setMessage('Stack is full (Overflow)');
      setMessageType('error');
      return;
    }

    const value = parseInt(currentValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      setMessageType('error');
      return;
    }

    const newStackArray = [...stackArray];
    newStackArray[topIndex + 1] = value;
    setStackArray(newStackArray);
    setTopIndex(topIndex + 1);
    setCurrentValue('');
    setMessage(`${value} pushed to stack`);
    setMessageType('success');
  };

  const pop = () => {
    if (topIndex === -1) {
      setMessage('Stack is empty (Underflow)');
      setMessageType('error');
      return;
    }

    const newStackArray = [...stackArray];
    const poppedValue = newStackArray[topIndex];
    newStackArray[topIndex] = null;
    setStackArray(newStackArray);
    setTopIndex(topIndex - 1);
    setMessage(`${poppedValue} popped from stack`);
    setMessageType('success');
  };

  const peek = () => {
    if (topIndex === -1) {
      setMessage('Stack is empty');
      setMessageType('error');
      return;
    }

    setMessage(`Top element is ${stackArray[topIndex]}`);
    setMessageType('success');
  };

  const isEmpty = () => {
    const empty = topIndex === -1;
    setMessage(empty ? 'Stack is empty' : 'Stack is not empty');
    setMessageType('success');
  };

  const isFull = () => {
    const full = topIndex === stackSize - 1;
    setMessage(full ? 'Stack is full' : 'Stack is not full');
    setMessageType('success');
  };

  // Queue operations
  const enqueue = () => {
    if (rearIndex === queueSize - 1) {
      setMessage('Queue is full (Overflow)');
      setMessageType('error');
      return;
    }

    const value = parseInt(currentValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      setMessageType('error');
      return;
    }

    const newQueueArray = [...queueArray];
    newQueueArray[rearIndex + 1] = value;
    setQueueArray(newQueueArray);
    setRearIndex(rearIndex + 1);
    if (frontIndex === -1) {
      setFrontIndex(0);
    }
    setCurrentValue('');
    setMessage(`${value} enqueued`);
    setMessageType('success');
  };

  const dequeue = () => {
    if (frontIndex === -1) {
      setMessage('Queue is empty (Underflow)');
      setMessageType('error');
      return;
    }

    const newQueueArray = [...queueArray];
    const dequeuedValue = newQueueArray[frontIndex];
    newQueueArray[frontIndex] = null;
    setQueueArray(newQueueArray);
    setFrontIndex(frontIndex + 1);
    if (frontIndex > rearIndex) {
      setFrontIndex(-1);
      setRearIndex(-1);
    }
    setMessage(`${dequeuedValue} dequeued`);
    setMessageType('success');
  };

  const queueFront = () => {
    if (frontIndex === -1) {
      setMessage('Queue is empty');
      setMessageType('error');
      return;
    }

    setMessage(`Front element is ${queueArray[frontIndex]}`);
    setMessageType('success');
  };

  const queueRear = () => {
    if (rearIndex === -1) {
      setMessage('Queue is empty');
      setMessageType('error');
      return;
    }

    setMessage(`Rear element is ${queueArray[rearIndex]}`);
    setMessageType('success');
  };

  const isQueueEmpty = () => {
    const empty = frontIndex === -1;
    setMessage(empty ? 'Queue is empty' : 'Queue is not empty');
    setMessageType('success');
  };

  const isQueueFull = () => {
    const full = rearIndex === queueSize - 1;
    setMessage(full ? 'Queue is full' : 'Queue is not full');
    setMessageType('success');
  };

  const resetToMainMenu = () => {
    setMainMenu(true);
    setStackMenu(false);
    setQueueMenu(false);
    setStackSize(0);
    setQueueSize(0);
    setStackArray([]);
    setQueueArray([]);
    setTopIndex(-1);
    setFrontIndex(-1);
    setRearIndex(-1);
    setMessage('');
    setMessageType('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {mainMenu ? 'Data Structure Configuration' : 
                (stackMenu ? 'Stack Operations' : 'Queue Operations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Main Menu */}
            {mainMenu && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-lg font-medium mb-2">Stack</h2>
                  <Input 
                    type="number" 
                    placeholder="Enter Stack Size"
                    value={stackSize}
                    onChange={(e) => setStackSize(parseInt(e.target.value))}
                    className="w-full mb-2"
                  />
                  <Button onClick={handleSetStackSize} className="w-full">
                    Create Stack
                  </Button>
                </div>
                <div>
                  <h2 className="text-lg font-medium mb-2">Queue</h2>
                  <Input
                    type="number" 
                    placeholder="Enter Queue Size"
                    value={queueSize}
                    onChange={(e) => setQueueSize(parseInt(e.target.value))}
                    className="w-full mb-2"
                  />
                  <Button onClick={handleSetQueueSize} className="w-full">
                    Create Queue
                  </Button>
                </div>
              </div>
            )}

            {/* Stack Menu */}
            {stackMenu && (
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {stackArray.map((item, index) => (
                    <div 
                      key={index} 
                      className={`border p-2 text-center 
                        ${item !== null ? 'bg-blue-100' : 'bg-gray-100'}
                        ${index === topIndex ? 'border-blue-500 border-2' : ''}`}
                    >
                      {item !== null ? item : '-'}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Input 
                    type="text" 
                    placeholder="Enter value to push"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="w-full"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Button onClick={push}>Push</Button>
                    <Button onClick={pop}>Pop</Button>
                    <Button onClick={peek}>Peek</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={isEmpty}>Is Empty</Button>
                    <Button onClick={isFull}>Is Full</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={resetToMainMenu}>
                      Back to Menu
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => window.close()}
                    >
                      Exit
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Queue Menu */}
            {queueMenu && (
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {queueArray.map((item, index) => (
                    <div 
                      key={index} 
                      className={`border p-2 text-center 
                        ${item !== null ? 'bg-blue-100' : 'bg-gray-100'}
                        ${index === frontIndex || index === rearIndex ? 'border-blue-500 border-2' : ''}`}
                    >
                      {item !== null ? item : '-'}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Input 
                    type="text" 
                    placeholder="Enter value to enqueue"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="w-full"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Button onClick={enqueue}>Enqueue</Button>
                    <Button onClick={dequeue}>Dequeue</Button>
                    <Button onClick={queueFront}>Front</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={isQueueEmpty}>Is Empty</Button>
                    <Button onClick={isQueueFull}>Is Full</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="secondary" onClick={resetToMainMenu}>
                      Back to Menu
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => window.close()}
                    >
                      Exit
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <Alert 
                variant={messageType === 'error' ? 'destructive' : 'default'}
                className="mt-4"
              >
                {messageType === 'error' ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {messageType === 'error' ? 'Error' : 'Success'}
                </AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataStructureConfiguration;