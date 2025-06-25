import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Download, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import CompressionChart from "@/components/CompressionChart";

export default function Compress() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState("");
  const [operation, setOperation] = useState("compress");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    outputSize: number;
    ratio: number;
    timeMs: number;
  } | null>(null);

  const handleProcess = async () => {
    if (!selectedFile || !algorithm) return;

    setIsProcessing(true);
    setProgress(0);
    setCompressionStats(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("operation", operation);
    formData.append("algorithm", algorithm);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    try {
      const response = await fetch("/api/file/process", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) throw new Error("Failed to process file");

      // ✅ Read stats from headers
      const originalSize = Number(response.headers.get("X-Original-Size"));
      const outputSize = Number(response.headers.get("X-Output-Size"));
      const timeMs = Number(response.headers.get("X-Processing-Time"));
      const ratio = originalSize === 0 ? 0 : outputSize / originalSize;

      setCompressionStats({
        originalSize,
        outputSize,
        ratio,
        timeMs,
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const suffix = operation === "compress" ? "_compressed" : "_decompressed";
      const nameParts = selectedFile.name.split(".");
      const ext = nameParts.pop();
      const base = nameParts.join(".");
      link.href = url;
      link.download = `${base}${suffix}.${ext || "bin"}`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error processing file");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <>
      <Navbar />
      <div className="w-full max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6" />
              File Compression Tool
            </CardTitle>
            <CardDescription>
              Upload any file and compress or decompress it using various
              algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload">File Upload</Label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="*/*"
                />
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium">
                  {selectedFile
                    ? selectedFile.name
                    : "Drop your file here or click to browse"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedFile
                    ? `Size: ${formatFileSize(selectedFile.size)} • Type: ${
                        selectedFile.type || "Unknown"
                      }`
                    : "Supports all file types (text, image, binary, etc.)"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="algorithm">Compression Algorithm</Label>
              <Select value={algorithm} onValueChange={setAlgorithm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compression algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="huffman">Huffman Coding</SelectItem>
                  <SelectItem value="rle">Run-Length Encoding (RLE)</SelectItem>
                  <SelectItem value="lz77">LZ77</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Operation</Label>
              <RadioGroup
                value={operation}
                onValueChange={setOperation}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compress" id="compress" />
                  <Label htmlFor="compress" className="cursor-pointer">
                    Compress File
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="decompress" id="decompress" />
                  <Label htmlFor="decompress" className="cursor-pointer">
                    Decompress File
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <Label>Processing...</Label>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-gray-500 text-center">
                  {operation === "compress" ? "Compressing" : "Decompressing"}{" "}
                  file using {algorithm}... {progress}%
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleProcess}
                disabled={!selectedFile || !algorithm || isProcessing}
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                {operation === "compress" ? "Compress File" : "Decompress File"}
              </Button>

              <Button
                variant="outline"
                disabled={!selectedFile || isProcessing}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Result
              </Button>
            </div>

            {selectedFile && (
              <Card className="bg-gray-50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-xs text-gray-500">
                        Original Size
                      </Label>
                      <p className="font-medium">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">File Type</Label>
                      <p className="font-medium">
                        {selectedFile.type || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Algorithm</Label>
                      <p className="font-medium">
                        {algorithm || "Not selected"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Operation</Label>
                      <p className="font-medium capitalize">{operation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
        {compressionStats && (
          <>
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Compression Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-gray-500">Original Size</Label>
                  <p className="font-medium">
                    {formatFileSize(compressionStats.originalSize)}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Output Size</Label>
                  <p className="font-medium">
                    {formatFileSize(compressionStats.outputSize)}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">
                    Compression Ratio
                  </Label>
                  <p className="font-medium">
                    {compressionStats.ratio.toFixed(2)}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">
                    Processing Time
                  </Label>
                  <p className="font-medium">{compressionStats.timeMs} ms</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 bg-white">
              <CardHeader>
                <CardTitle>Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <CompressionChart
                  originalSize={compressionStats.originalSize}
                  outputSize={compressionStats.outputSize}
                />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
