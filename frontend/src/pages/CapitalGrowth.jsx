import { useState, useMemo } from "react";
import {
  Box,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  FormLabel,
  FormControl,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function CapitalGrowth() {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualReturnRate, setAnnualReturnRate] = useState(7);
  const [years, setYears] = useState(10);

  // Calculate projected growth data
  const projectionData = useMemo(() => {
    const data = [];
    let currentBalance = initialAmount;
    let totalContributions = initialAmount;
    const monthlyRate = annualReturnRate / 100 / 12;
    const totalMonths = years * 12;

    // Add initial data point
    data.push({
      year: 0,
      balance: initialAmount,
      contributions: initialAmount,
      returns: 0,
    });

    for (let month = 1; month <= totalMonths; month++) {
      // Add monthly contribution
      currentBalance += monthlyContribution;
      totalContributions += monthlyContribution;
      
      // Apply monthly compound interest
      currentBalance *= (1 + monthlyRate);
      
      // Add data point for each year
      if (month % 12 === 0) {
        const year = month / 12;
        const totalReturns = currentBalance - totalContributions;
        
        data.push({
          year,
          balance: Math.round(currentBalance * 100) / 100,
          contributions: totalContributions,
          returns: Math.round(totalReturns * 100) / 100,
        });
      }
    }

    return data;
  }, [initialAmount, monthlyContribution, annualReturnRate, years]);

  const finalData = projectionData[projectionData.length - 1];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltipValue = (value, name) => {
    return [formatCurrency(value), name === 'balance' ? 'Total Balance' : name === 'contributions' ? 'Total Contributions' : 'Total Returns'];
  };

  return (
    <Box maxW="6xl" mx="auto" mt={10} p={6}>
      <Heading size="md" mb={6}>Capital Growth Projections</Heading>
      <Text mb={6} color="gray.600">
        Simulate future balance if you invest fixed amounts over time with compound returns.
      </Text>

      <VStack spacing={6} align="stretch">
        {/* Input Form */}
        <Card>
          <CardBody>
            <Heading size="sm" mb={4}>Investment Parameters</Heading>
            <HStack spacing={6} flexWrap="wrap">
              <FormControl maxW="200px">
                <FormLabel fontSize="sm">Initial Amount</FormLabel>
                <Input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  min={0}
                />
              </FormControl>
              
              <FormControl maxW="200px">
                <FormLabel fontSize="sm">Monthly Contribution</FormLabel>
                <Input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  min={0}
                />
              </FormControl>
              
              <FormControl maxW="200px">
                <FormLabel fontSize="sm">Annual Return Rate (%)</FormLabel>
                <Input
                  type="number"
                  step="0.1"
                  value={annualReturnRate}
                  onChange={(e) => setAnnualReturnRate(Number(e.target.value))}
                  min={0}
                  max={50}
                />
              </FormControl>
              
              <FormControl maxW="200px">
                <FormLabel fontSize="sm">Time Period (Years)</FormLabel>
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min={1}
                  max={50}
                />
              </FormControl>
            </HStack>
          </CardBody>
        </Card>

        {/* Key Metrics */}
        <HStack spacing={6} flexWrap="wrap">
          <Stat>
            <StatLabel>Final Balance</StatLabel>
            <StatNumber color="green.500">{formatCurrency(finalData?.balance || 0)}</StatNumber>
            <StatHelpText>After {years} years</StatHelpText>
          </Stat>
          
          <Stat>
            <StatLabel>Total Contributions</StatLabel>
            <StatNumber color="blue.500">{formatCurrency(finalData?.contributions || 0)}</StatNumber>
            <StatHelpText>Principal invested</StatHelpText>
          </Stat>
          
          <Stat>
            <StatLabel>Total Returns</StatLabel>
            <StatNumber color="purple.500">{formatCurrency(finalData?.returns || 0)}</StatNumber>
            <StatHelpText>Gains from compound interest</StatHelpText>
          </Stat>
        </HStack>

        {/* Growth Chart */}
        <Card>
          <CardBody>
            <Heading size="sm" mb={4}>Growth Projection Over Time</Heading>
            <Box h="400px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#38A169" 
                    strokeWidth={3}
                    name="Total Balance"
                    dot={{ fill: '#38A169', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contributions" 
                    stroke="#3182CE" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Total Contributions"
                    dot={{ fill: '#3182CE', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="returns" 
                    stroke="#805AD5" 
                    strokeWidth={2}
                    name="Total Returns"
                    dot={{ fill: '#805AD5', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}