import {
  ArrowRight,
  Zap,
  FileText,
  BarChart3,
  Download,
  Shield,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import dataCompressionImage from "@/assets/dataCompressImg.webp"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const algorithms = [
    {
      id: "rle",
      name: "Run-Length Encoding (RLE)",
      description:
        "A simple lossless compression algorithm that replaces sequences of identical data with a count and the data value.",
      complexity: "Low",
      efficiency: "Medium",
      bestFor: [
        "Images with solid colors",
        "Simple graphics",
        "Binary data with repetition",
      ],
      howItWorks:
        "Scans data sequentially and replaces runs of identical bytes with a count-value pair. For example, 'AAABBB' becomes '3A3B'.",
      advantages: [
        "Simple to implement",
        "Fast compression/decompression",
        "Good for specific data types",
      ],
      disadvantages: [
        "Poor performance on random data",
        "Can increase file size if no repetition exists",
      ],
      useCase:
        "Ideal for bitmap images, fax transmissions, and data with long runs of identical values.",
    },
    {
      id: "huffman",
      name: "Huffman Coding",
      description:
        "An optimal prefix-free coding algorithm that assigns variable-length codes to characters based on their frequency.",
      complexity: "Medium",
      efficiency: "High",
      bestFor: [
        "Text files",
        "General purpose compression",
        "Data with uneven symbol distribution",
      ],
      howItWorks:
        "Builds a binary tree based on character frequencies, assigning shorter codes to more frequent characters. Creates a prefix-free code system.",
      advantages: [
        "Optimal for known symbol probabilities",
        "No information loss",
        "Widely applicable",
      ],
      disadvantages: [
        "Requires two passes through data",
        "Tree overhead",
        "Not adaptive",
      ],
      useCase:
        "Foundation for many compression formats like JPEG, PNG, and ZIP. Excellent for text and general data compression.",
    },
    {
      id: "lz77",
      name: "LZ77 (Lempel-Ziv 1977)",
      description:
        "A dictionary-based compression algorithm that replaces repeated sequences with references to previous occurrences.",
      complexity: "High",
      efficiency: "Very High",
      bestFor: ["Text files", "Source code", "Data with repetitive patterns"],
      howItWorks:
        "Uses a sliding window to find matches between current data and previously seen data, replacing matches with distance-length pairs.",
      advantages: [
        "Excellent compression ratios",
        "Adaptive algorithm",
        "No prior knowledge needed",
      ],
      disadvantages: [
        "Computationally intensive",
        "Complex implementation",
        "Memory intensive",
      ],
      useCase:
        "Basis for popular formats like DEFLATE (used in ZIP, PNG, HTTP compression). Excellent for text and structured data.",
    },
  ];

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Universal File Support",
      description:
        "Compress any file type - text, images, documents, or binary files with ease.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Detailed Analytics",
      description:
        "Get comprehensive statistics including compression ratios, file sizes, and processing times.",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Easy Download",
      description:
        "Download your compressed or decompressed files instantly with a single click.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Processing",
      description:
        "All file processing happens locally in your browser - your data never leaves your device.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Progress",
      description:
        "Monitor compression progress with live updates and processing time estimates.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Educational Content",
      description:
        "Learn about compression algorithms with detailed explanations and use cases.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-200">
                    Advanced Compression Suite
                  </Badge>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Compress Files with
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      {" "}
                      Intelligence
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Experience the power of advanced compression algorithms.
                    Reduce file sizes, save storage space, and learn about data
                    compression with our comprehensive suite of tools.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 cursor-pointer"
                    onClick={() => navigate("/compress")}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="relative ">
                <div className="relative z-10">
                  <img
                    src={dataCompressionImage}
                    alt="Data Compression Visualization"
                    className="w-full h-96 rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-2xl"></div>
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for professional file compression and
                decompression
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                Compression Algorithms
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from multiple industry-standard algorithms, each
                optimized for different types of data
              </p>
            </div>

            <Tabs defaultValue="rle" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {algorithms.map((algorithm) => (
                  <TabsTrigger
                    key={algorithm.id}
                    value={algorithm.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {algorithm.name.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {algorithms.map((algorithm) => (
                <TabsContent key={algorithm.id} value={algorithm.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <Card className="h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">
                              {algorithm.name}
                            </CardTitle>
                            <div className="flex gap-2">
                              <Badge
                                variant={
                                  algorithm.complexity === "Low"
                                    ? "secondary"
                                    : algorithm.complexity === "Medium"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {algorithm.complexity} Complexity
                              </Badge>
                              <Badge
                                variant={
                                  algorithm.efficiency === "Medium"
                                    ? "secondary"
                                    : algorithm.efficiency === "High"
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {algorithm.efficiency} Efficiency
                              </Badge>
                            </div>
                          </div>
                          <CardDescription className="text-lg">
                            {algorithm.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-lg mb-2">
                              How It Works
                            </h4>
                            <p className="text-gray-600">
                              {algorithm.howItWorks}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-green-700">
                                Advantages
                              </h4>
                              <ul className="space-y-1">
                                {algorithm.advantages.map(
                                  (advantage, index) => (
                                    <li
                                      key={index}
                                      className="text-sm text-gray-600 flex items-start"
                                    >
                                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                      {advantage}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-2 text-red-700">
                                Disadvantages
                              </h4>
                              <ul className="space-y-1">
                                {algorithm.disadvantages.map(
                                  (disadvantage, index) => (
                                    <li
                                      key={index}
                                      className="text-sm text-gray-600 flex items-start"
                                    >
                                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                      {disadvantage}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Best For</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {algorithm.bestFor.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm"
                              >
                                <Zap className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Use Case</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            {algorithm.useCase}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Ready to Start Compressing?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Experience the power of advanced compression algorithms. Upload
                your files and see the magic happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 cursor-pointer"
                  onClick={() => navigate("/compress")}
                >
                  Start Compressing Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
