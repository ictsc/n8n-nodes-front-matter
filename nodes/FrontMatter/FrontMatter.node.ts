import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { IExecuteFunctions } from 'n8n-core';

import matter from 'gray-matter';

export class FrontMatter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Front Matter',
		name: 'frontMatter',
		group: ['transform'],
		version: 1,
		description: 'Front Matter Node',
		defaults: {
			name: 'Front Matter Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'The description text',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];

		const items = this.getInputData();
		const length = items.length;
		for (let i = 0; i < length; i++) {
			const text = this.getNodeParameter('text', i) as string;

			const result = matter(text);

			returnData.push({
				json: {
					data: result.data,
					matter: result.matter,
					content: result.content,
				},
			});
		}

		return [returnData];
	}
}
