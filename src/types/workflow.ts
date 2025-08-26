import { Id } from "../../convex/_generated/dataModel";

// Base node types
export type NodeType = "chat" | "document" | "import" | "presentation";

export type ConnectionType = "context" | "content" | "data";

export interface Position {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}

// Core workflow entities
export interface Workflow {
	_id: Id<"workflows">;
	ownerId: Id<"users">;
	title: string;
	description?: string;
	isDefault?: boolean;
	createdAt: number;
	updatedAt: number;
}

export interface BaseNode {
	_id: Id<"nodes">;
	workflowId: Id<"workflows">;
	type: NodeType;
	title: string;
	position: Position;
	size?: Size;
	data: any;
	isOpen?: boolean;
	windowId?: string;
	createdAt: number;
	updatedAt: number;
}

export interface Connection {
	_id: Id<"connections">;
	workflowId: Id<"workflows">;
	sourceNodeId: Id<"nodes">;
	targetNodeId: Id<"nodes">;
	sourceHandle?: string;
	targetHandle?: string;
	type: ConnectionType;
	createdAt: number;
}

export interface Group {
	_id: Id<"groups">;
	workflowId: Id<"workflows">;
	title: string;
	nodeIds: Id<"nodes">[];
	position: Position;
	size: Size;
	color?: string;
	createdAt: number;
}

export interface Message {
	_id: Id<"messages">;
	nodeId: Id<"nodes">;
	authorId?: Id<"users">;
	role: "user" | "assistant" | "system";
	content: string;
	model?: string;
	createdAt: number;
}

// Specific node data interfaces
export interface ChatNodeData {
	model?: string;
	systemPrompt?: string;
	temperature?: number;
	maxTokens?: number;
	messageCount: number;
}

export interface DocumentNodeData {
	content: string;
	format: "markdown" | "html" | "plain";
	wordCount: number;
}

export interface ImportNodeData {
	sourceType: "file" | "url" | "text";
	source: string;
	content?: string;
	metadata?: Record<string, any>;
}

export interface PresentationNodeData {
	slides: Array<{
		id: string;
		title: string;
		content: string;
		layout: "title" | "content" | "two-column";
	}>;
	theme?: string;
}

// Typed node interfaces
export interface ChatNode extends BaseNode {
	type: "chat";
	data: ChatNodeData;
}

export interface DocumentNode extends BaseNode {
	type: "document";
	data: DocumentNodeData;
}

export interface ImportNode extends BaseNode {
	type: "import";
	data: ImportNodeData;
}

export interface PresentationNode extends BaseNode {
	type: "presentation";
	data: PresentationNodeData;
}

export type TypedNode = ChatNode | DocumentNode | ImportNode | PresentationNode;

// React Flow types
export interface ReactFlowNode {
	id: string;
	type: NodeType;
	position: Position;
	data: {
		nodeId: Id<"nodes">;
		title: string;
		nodeData: any;
	};
}

export interface ReactFlowEdge {
	id: string;
	source: string;
	target: string;
	type?: string;
	sourceHandle?: string;
	targetHandle?: string;
	data?: {
		connectionId: Id<"connections">;
		connectionType: ConnectionType;
	};
}
