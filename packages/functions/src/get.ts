import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
	const params = {
		TableName: Table.Notes.tableName,
		Key: {
			userId: "123", // The id of the author
			noteId: event?.pathParameters?.id, // The id of the note from the path
		},
	};

	const result = await dynamoDb.get(params);
	if (!result.Item) {
		throw new Error("Item not found.");
	}

	return JSON.stringify(result.Item);
})
